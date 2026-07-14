import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Bell, Palette, Lock, Eye, Smartphone, Mail, Moon, Monitor } from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import './Settings.css';

const Settings = () => {
  const [activeSection, setActiveSection] = useState('security');

  const navItems = [
    { id: 'security', label: 'Account Security', icon: <Shield size={18} /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell size={18} /> },
    { id: 'appearance', label: 'Appearance', icon: <Palette size={18} /> }
  ];

  const renderContent = () => {
    switch(activeSection) {
      case 'security':
        return (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="settings-panel"
          >
            <div className="panel-header">
              <h2>Account Security</h2>
              <p>Manage your password and security settings.</p>
            </div>
            
            <Card className="settings-card">
              <div className="setting-item">
                <div className="setting-info">
                  <div className="setting-icon"><Lock size={20} /></div>
                  <div>
                    <h4>Change Password</h4>
                    <p>Update your password for enhanced security</p>
                  </div>
                </div>
                <Button variant="secondary">Update</Button>
              </div>
              
              <div className="setting-item">
                <div className="setting-info">
                  <div className="setting-icon"><Smartphone size={20} /></div>
                  <div>
                    <h4>Two-Factor Authentication</h4>
                    <p>Add an extra layer of security to your account</p>
                  </div>
                </div>
                <div className="toggle-switch active">
                  <div className="toggle-knob"></div>
                </div>
              </div>

              <div className="setting-item border-none">
                <div className="setting-info">
                  <div className="setting-icon"><Eye size={20} /></div>
                  <div>
                    <h4>Active Sessions</h4>
                    <p>Manage devices currently logged into your account</p>
                  </div>
                </div>
                <Button variant="secondary">Manage</Button>
              </div>
            </Card>
          </motion.div>
        );
      
      case 'notifications':
        return (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="settings-panel"
          >
            <div className="panel-header">
              <h2>Notification Preferences</h2>
              <p>Control how and when you want to be notified.</p>
            </div>
            
            <Card className="settings-card">
              <div className="setting-item">
                <div className="setting-info">
                  <div className="setting-icon"><Mail size={20} /></div>
                  <div>
                    <h4>Email Notifications</h4>
                    <p>Receive updates and reports via email</p>
                  </div>
                </div>
                <div className="toggle-switch active">
                  <div className="toggle-knob"></div>
                </div>
              </div>
              
              <div className="setting-item border-none">
                <div className="setting-info">
                  <div className="setting-icon"><Bell size={20} /></div>
                  <div>
                    <h4>Push Notifications</h4>
                    <p>Receive instant notifications in your browser</p>
                  </div>
                </div>
                <div className="toggle-switch">
                  <div className="toggle-knob"></div>
                </div>
              </div>
            </Card>
          </motion.div>
        );

      case 'appearance':
        return (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="settings-panel"
          >
            <div className="panel-header">
              <h2>Appearance</h2>
              <p>Customize how the platform looks on your device.</p>
            </div>
            
            <Card className="settings-card">
              <div className="theme-options">
                <div className="theme-card">
                  <div className="theme-preview light"></div>
                  <span>Light</span>
                </div>
                <div className="theme-card active">
                  <div className="theme-preview dark"></div>
                  <span>Dark</span>
                </div>
                <div className="theme-card">
                  <div className="theme-preview system">
                    <Monitor size={24} className="system-icon" />
                  </div>
                  <span>System</span>
                </div>
              </div>
              
              <div className="setting-item border-none mt-4">
                <div className="setting-info">
                  <div className="setting-icon"><Moon size={20} /></div>
                  <div>
                    <h4>Reduced Motion</h4>
                    <p>Minimize animations throughout the interface</p>
                  </div>
                </div>
                <div className="toggle-switch">
                  <div className="toggle-knob"></div>
                </div>
              </div>
            </Card>
          </motion.div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="settings-container">
      <div className="settings-layout">
        <aside className="settings-sidebar">
          <h1 className="settings-title">Settings</h1>
          <nav className="settings-nav">
            {navItems.map(item => (
              <button
                key={item.id}
                className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
                onClick={() => setActiveSection(item.id)}
              >
                {item.icon}
                <span>{item.label}</span>
                {activeSection === item.id && (
                  <motion.div layoutId="activeNav" className="active-nav-bg" />
                )}
              </button>
            ))}
          </nav>
        </aside>
        
        <main className="settings-content">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Settings;
