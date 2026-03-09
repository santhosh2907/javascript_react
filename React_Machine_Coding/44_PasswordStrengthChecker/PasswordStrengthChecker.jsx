import React, { useState } from 'react';
import './PasswordStrengthChecker.css';

const PasswordStrengthChecker = () => {
  const [password, setPassword] = useState('');

  const calculateStrength = (pwd) => {
    let score = 0;
    if (!pwd) return { score: 0, label: 'None', color: '#e0e0e0' };

    if (pwd.length > 8) score += 1;
    if (/[A-Z]/.test(pwd)) score += 1;
    if (/[a-z]/.test(pwd)) score += 1;
    if (/[0-9]/.test(pwd)) score += 1;
    if (/[^A-Za-z0-9]/.test(pwd)) score += 1;

    switch (score) {
      case 0:
      case 1:
        return { score: 1, label: 'Weak', color: '#ff4d4d' };
      case 2:
      case 3:
        return { score: 3, label: 'Fair', color: '#ffcc00' };
      case 4:
        return { score: 4, label: 'Good', color: '#66cc66' };
      case 5:
        return { score: 5, label: 'Strong', color: '#4d94ff' };
      default:
        return { score: 0, label: 'None', color: '#e0e0e0' };
    }
  };

  const strength = calculateStrength(password);

  return (
    <div className="passwordstrengthchecker-container">
      <h2>Password Strength Checker</h2>
      <div className="input-group">
        <label htmlFor="password">Enter Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Type your password..."
        />
      </div>
      
      <div className="strength-meter-container">
        <div className="strength-meter-bar">
          <div 
            className="strength-meter-fill" 
            style={{ 
              width: \`\${(strength.score / 5) * 100}%\`,
              backgroundColor: strength.color 
            }}
          ></div>
        </div>
        <p className="strength-label" style={{ color: strength.color }}>
          Strength: {strength.label}
        </p>
      </div>

      <div className="requirements-list">
        <p>Password must contain:</p>
        <ul>
          <li className={password.length > 8 ? 'met' : ''}>At least 8 characters</li>
          <li className={/[A-Z]/.test(password) ? 'met' : ''}>One uppercase letter</li>
          <li className={/[a-z]/.test(password) ? 'met' : ''}>One lowercase letter</li>
          <li className={/[0-9]/.test(password) ? 'met' : ''}>One number</li>
          <li className={/[^A-Za-z0-9]/.test(password) ? 'met' : ''}>One special character</li>
        </ul>
      </div>
    </div >
  );
};

export default PasswordStrengthChecker;
