#!/usr/bin/env python3
"""
Immediate Accuracy Tracking System for Astrology API
"""

import json
import sqlite3
from datetime import datetime, timedelta
from typing import Dict, Any, List, Optional
import hashlib

class AccuracyTracker:
    """
    Track and measure astrology prediction accuracy
    """
    
    def __init__(self, db_path: str = "accuracy_tracker.db"):
        self.db_path = db_path
        self.init_database()
    
    def init_database(self):
        """Initialize the accuracy tracking database"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        # Create tables for tracking accuracy
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS predictions (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                prediction_type TEXT NOT NULL,
                input_data TEXT NOT NULL,
                prediction_output TEXT NOT NULL,
                data_source TEXT NOT NULL,
                timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
                user_feedback INTEGER DEFAULT NULL,
                expert_validation INTEGER DEFAULT NULL,
                accuracy_score REAL DEFAULT NULL
            )
        ''')
        
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS accuracy_metrics (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                date DATE NOT NULL,
                prediction_type TEXT NOT NULL,
                total_predictions INTEGER DEFAULT 0,
                accurate_predictions INTEGER DEFAULT 0,
                accuracy_percentage REAL DEFAULT 0.0,
                data_source TEXT NOT NULL
            )
        ''')
        
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS user_feedback (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                prediction_id INTEGER,
                user_rating INTEGER CHECK (user_rating >= 1 AND user_rating <= 5),
                feedback_text TEXT,
                timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (prediction_id) REFERENCES predictions (id)
            )
        ''')
        
        conn.commit()
        conn.close()
    
    def log_prediction(self, prediction_type: str, input_data: Dict, output_data: Dict, data_source: str = "GPT-5") -> int:
        """
        Log a prediction for accuracy tracking
        """
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        # Create a hash of input data for consistency checking
        input_hash = hashlib.md5(json.dumps(input_data, sort_keys=True).encode()).hexdigest()
        
        cursor.execute('''
            INSERT INTO predictions (prediction_type, input_data, prediction_output, data_source)
            VALUES (?, ?, ?, ?)
        ''', (
            prediction_type,
            json.dumps(input_data),
            json.dumps(output_data),
            data_source
        ))
        
        prediction_id = cursor.lastrowid
        conn.commit()
        conn.close()
        
        return prediction_id
    
    def add_user_feedback(self, prediction_id: int, rating: int, feedback_text: str = ""):
        """
        Add user feedback for a prediction
        """
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        cursor.execute('''
            INSERT INTO user_feedback (prediction_id, user_rating, feedback_text)
            VALUES (?, ?, ?)
        ''', (prediction_id, rating, feedback_text))
        
        # Update the prediction with user feedback
        cursor.execute('''
            UPDATE predictions 
            SET user_feedback = ? 
            WHERE id = ?
        ''', (rating, prediction_id))
        
        conn.commit()
        conn.close()
    
    def add_expert_validation(self, prediction_id: int, expert_score: int, notes: str = ""):
        """
        Add expert validation for a prediction
        """
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        cursor.execute('''
            UPDATE predictions 
            SET expert_validation = ? 
            WHERE id = ?
        ''', (expert_score, prediction_id))
        
        conn.commit()
        conn.close()
    
    def get_accuracy_stats(self, days: int = 30, prediction_type: str = None) -> Dict[str, Any]:
        """
        Get accuracy statistics for the specified period
        """
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        date_filter = f"AND date >= date('now', '-{days} days')"
        type_filter = f"AND prediction_type = '{prediction_type}'" if prediction_type else ""
        
        query = f'''
            SELECT 
                prediction_type,
                data_source,
                COUNT(*) as total_predictions,
                AVG(user_feedback) as avg_user_rating,
                AVG(expert_validation) as avg_expert_rating,
                COUNT(CASE WHEN user_feedback >= 4 THEN 1 END) as high_rated_predictions
            FROM predictions 
            WHERE timestamp >= datetime('now', '-{days} days')
            {type_filter}
            GROUP BY prediction_type, data_source
        '''
        
        cursor.execute(query)
        results = cursor.fetchall()
        
        stats = {
            'period_days': days,
            'total_predictions': 0,
            'accuracy_by_type': {},
            'accuracy_by_source': {},
            'overall_accuracy': 0.0
        }
        
        for row in results:
            pred_type, data_source, total, avg_user, avg_expert, high_rated = row
            
            if pred_type not in stats['accuracy_by_type']:
                stats['accuracy_by_type'][pred_type] = {
                    'total': 0,
                    'avg_user_rating': 0.0,
                    'avg_expert_rating': 0.0,
                    'high_rated_percentage': 0.0
                }
            
            if data_source not in stats['accuracy_by_source']:
                stats['accuracy_by_source'][data_source] = {
                    'total': 0,
                    'avg_user_rating': 0.0,
                    'avg_expert_rating': 0.0,
                    'high_rated_percentage': 0.0
                }
            
            # Update type stats
            stats['accuracy_by_type'][pred_type]['total'] += total
            stats['accuracy_by_type'][pred_type]['avg_user_rating'] = avg_user or 0.0
            stats['accuracy_by_type'][pred_type]['avg_expert_rating'] = avg_expert or 0.0
            stats['accuracy_by_type'][pred_type]['high_rated_percentage'] = (high_rated / total * 100) if total > 0 else 0.0
            
            # Update source stats
            stats['accuracy_by_source'][data_source]['total'] += total
            stats['accuracy_by_source'][data_source]['avg_user_rating'] = avg_user or 0.0
            stats['accuracy_by_source'][data_source]['avg_expert_rating'] = avg_expert or 0.0
            stats['accuracy_by_source'][data_source]['high_rated_percentage'] = (high_rated / total * 100) if total > 0 else 0.0
            
            stats['total_predictions'] += total
        
        # Calculate overall accuracy
        if stats['total_predictions'] > 0:
            total_high_rated = sum(
                source_stats['high_rated_percentage'] * source_stats['total'] / 100
                for source_stats in stats['accuracy_by_source'].values()
            )
            stats['overall_accuracy'] = (total_high_rated / stats['total_predictions']) * 100
        
        conn.close()
        return stats
    
    def get_consistency_check(self, input_data: Dict) -> Dict[str, Any]:
        """
        Check consistency of predictions for same input
        """
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        input_hash = hashlib.md5(json.dumps(input_data, sort_keys=True).encode()).hexdigest()
        
        cursor.execute('''
            SELECT prediction_output, data_source, timestamp
            FROM predictions 
            WHERE input_data LIKE ?
            ORDER BY timestamp DESC
            LIMIT 10
        ''', (f'%{input_hash}%',))
        
        results = cursor.fetchall()
        conn.close()
        
        if len(results) < 2:
            return {
                'consistent': True,
                'total_predictions': len(results),
                'message': 'Insufficient data for consistency check'
            }
        
        # Check if outputs are similar (simplified check)
        outputs = [json.loads(row[0]) for row in results]
        sources = [row[1] for row in results]
        
        # Simple consistency check - compare key fields
        consistency_score = 0
        total_comparisons = 0
        
        for i in range(len(outputs)):
            for j in range(i + 1, len(outputs)):
                output1, output2 = outputs[i], outputs[j]
                
                # Compare common fields
                common_fields = set(output1.keys()) & set(output2.keys())
                matches = 0
                
                for field in common_fields:
                    if output1[field] == output2[field]:
                        matches += 1
                
                if common_fields:
                    consistency_score += matches / len(common_fields)
                    total_comparisons += 1
        
        avg_consistency = consistency_score / total_comparisons if total_comparisons > 0 else 0
        
        return {
            'consistent': avg_consistency > 0.8,
            'consistency_score': avg_consistency,
            'total_predictions': len(results),
            'data_sources': list(set(sources)),
            'message': f'Consistency score: {avg_consistency:.2%}'
        }
    
    def generate_accuracy_report(self, days: int = 30) -> str:
        """
        Generate a comprehensive accuracy report
        """
        stats = self.get_accuracy_stats(days)
        
        report = f"""
🔮 ASTROLOGY ACCURACY REPORT
Generated: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
Period: Last {days} days

📊 OVERALL STATISTICS
Total Predictions: {stats['total_predictions']}
Overall Accuracy: {stats['overall_accuracy']:.1f}%

📈 ACCURACY BY PREDICTION TYPE
"""
        
        for pred_type, type_stats in stats['accuracy_by_type'].items():
            report += f"""
{pred_type.upper()}:
  • Total: {type_stats['total']}
  • User Rating: {type_stats['avg_user_rating']:.1f}/5.0
  • Expert Rating: {type_stats['avg_expert_rating']:.1f}/5.0
  • High-Rated: {type_stats['high_rated_percentage']:.1f}%
"""
        
        report += f"""
🔍 ACCURACY BY DATA SOURCE
"""
        
        for source, source_stats in stats['accuracy_by_source'].items():
            report += f"""
{source.upper()}:
  • Total: {source_stats['total']}
  • User Rating: {source_stats['avg_user_rating']:.1f}/5.0
  • Expert Rating: {source_stats['avg_expert_rating']:.1f}/5.0
  • High-Rated: {source_stats['high_rated_percentage']:.1f}%
"""
        
        # Recommendations
        report += f"""
💡 RECOMMENDATIONS
"""
        
        if stats['overall_accuracy'] < 70:
            report += "• CRITICAL: Accuracy below 70% - Immediate improvements needed\n"
            report += "• Implement Swiss Ephemeris for real calculations\n"
            report += "• Add expert validation layer\n"
        elif stats['overall_accuracy'] < 85:
            report += "• MODERATE: Accuracy below 85% - Consider improvements\n"
            report += "• Review low-performing prediction types\n"
            report += "• Gather more expert feedback\n"
        else:
            report += "• EXCELLENT: Accuracy above 85% - Maintain current approach\n"
            report += "• Continue monitoring for consistency\n"
            report += "• Consider advanced features\n"
        
        return report

def main():
    """
    Demo the accuracy tracking system
    """
    tracker = AccuracyTracker()
    
    print("🔮 Astrology Accuracy Tracking System")
    print("=" * 50)
    
    # Simulate some predictions
    sample_input = {"zodiac_sign": "Aries", "date": "2024-01-15"}
    sample_output = {"prediction": "Great day for leadership", "lucky_color": "Red"}
    
    # Log predictions
    pred_id1 = tracker.log_prediction("horoscope", sample_input, sample_output, "GPT-5")
    pred_id2 = tracker.log_prediction("horoscope", sample_input, sample_output, "GPT-5")
    
    # Add feedback
    tracker.add_user_feedback(pred_id1, 4, "Pretty accurate!")
    tracker.add_user_feedback(pred_id2, 3, "Okay prediction")
    
    # Generate report
    report = tracker.generate_accuracy_report(30)
    print(report)
    
    # Check consistency
    consistency = tracker.get_consistency_check(sample_input)
    print(f"\n🔍 Consistency Check:")
    print(f"Consistent: {consistency['consistent']}")
    print(f"Score: {consistency['consistency_score']:.2%}")
    print(f"Message: {consistency['message']}")

if __name__ == "__main__":
    main()
