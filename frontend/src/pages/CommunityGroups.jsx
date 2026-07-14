import React from 'react';
import { motion } from 'framer-motion';
import { Users, MessageCircle, Activity, Plus } from 'lucide-react';
import Button from '../components/common/Button';
import './CommunityGroups.css';

const groups = [
  {
    id: 1,
    name: "React Ninjas",
    description: "Deep dives into React concurrent mode, hooks, and state management.",
    members: 142,
    posts: 328,
    lastActive: "10 mins ago",
    tags: ["Frontend", "React", "UI"]
  },
  {
    id: 2,
    name: "Cloud Architects",
    description: "Discussing AWS, Azure, and GCP enterprise scale architecture.",
    members: 89,
    posts: 156,
    lastActive: "1 hour ago",
    tags: ["AWS", "Architecture", "DevOps"]
  },
  {
    id: 3,
    name: "UI/UX Pioneers",
    description: "Sharing the latest trends in glassmorphism, neumorphism, and a11y.",
    members: 210,
    posts: 412,
    lastActive: "5 mins ago",
    tags: ["Design", "CSS", "Accessibility"]
  }
];

const CommunityGroups = () => {
  return (
    <div className="community-container">
      <div className="community-header">
        <div className="header-text">
          <h1>Study Groups & Communities</h1>
          <p>Join internal communities to share knowledge and learn together.</p>
        </div>
        <Button variant="primary" className="create-group-btn">
          <Plus size={18} /> Create Group
        </Button>
      </div>

      <div className="groups-grid">
        {groups.map((group, idx) => (
          <motion.div 
            key={group.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="group-card glass-panel"
          >
            <div className="group-info">
              <h3>{group.name}</h3>
              <p>{group.description}</p>
              <div className="group-tags">
                {group.tags.map(tag => (
                  <span key={tag} className="group-tag">{tag}</span>
                ))}
              </div>
            </div>

            <div className="group-stats">
              <div className="stat">
                <Users size={16} /> {group.members}
              </div>
              <div className="stat">
                <MessageCircle size={16} /> {group.posts}
              </div>
              <div className="stat last-active">
                <Activity size={16} /> {group.lastActive}
              </div>
            </div>

            <div className="group-actions">
              <Button variant="secondary" className="full-width">Join Group</Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CommunityGroups;
