import React from 'react';
import { motion } from 'framer-motion';
import { PenTool, MessageCircle, Heart, Share2, TrendingUp, ChevronRight, Tag } from 'lucide-react';
import './KnowledgeSharing.css';

const TRENDING_TOPICS = [
  { id: 1, tag: 'React18', count: '1.2k posts' },
  { id: 2, tag: 'SystemDesign', count: '850 posts' },
  { id: 3, tag: 'Agile', count: '640 posts' },
  { id: 4, tag: 'GenerativeAI', count: '520 posts' },
];

const MOCK_POSTS = [
  {
    id: 1,
    author: 'Michael Chang',
    authorRole: 'Tech Lead',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150',
    time: '2 hours ago',
    title: 'How we reduced our React bundle size by 40%',
    content: 'Last sprint, we noticed our main application was taking too long to load on slow connections. By implementing dynamic imports and analyzing our webpack bundle, we managed to cut down the initial load significantly. Here is the step-by-step process we followed...',
    tags: ['React', 'Performance', 'Webpack'],
    likes: 124,
    comments: 32
  },
  {
    id: 2,
    author: 'Emma Wilson',
    authorRole: 'Product Manager',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
    time: '5 hours ago',
    title: 'Question: Best practices for managing cross-team dependencies?',
    content: 'Hey everyone, as we scale our microservices architecture, we are running into friction with cross-team deployments. Does anyone have a recommended framework or toolset for tracking and managing these dependencies without slowing down delivery?',
    tags: ['Agile', 'Management', 'Microservices'],
    likes: 45,
    comments: 18
  }
];

const KnowledgeSharing = () => {
  return (
    <div className="knowledge-sharing-container">
      <div className="knowledge-layout">
        
        <main className="feed-section">
          <div className="feed-header">
            <div>
              <motion.h1 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                Knowledge Exchange
              </motion.h1>
              <p>Share insights, ask questions, and learn from peers.</p>
            </div>
            <button className="btn-primary create-post-btn">
              <PenTool size={18} /> Post an Article
            </button>
          </div>

          <div className="feed-list">
            {MOCK_POSTS.map((post, index) => (
              <motion.div 
                key={post.id} 
                className="post-card glass-panel"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="post-header">
                  <img src={post.avatar} alt={post.author} className="post-avatar" />
                  <div className="post-meta">
                    <h4>{post.author}</h4>
                    <span>{post.authorRole} • {post.time}</span>
                  </div>
                </div>
                
                <h3 className="post-title">{post.title}</h3>
                <p className="post-content">{post.content}</p>
                
                <div className="post-tags">
                  {post.tags.map(tag => (
                    <span key={tag} className="tag"><Tag size={12}/> {tag}</span>
                  ))}
                </div>
                
                <div className="post-actions">
                  <button className="action-btn"><Heart size={18} /> {post.likes}</button>
                  <button className="action-btn"><MessageCircle size={18} /> {post.comments}</button>
                  <button className="action-btn share-btn"><Share2 size={18} /> Share</button>
                </div>
              </motion.div>
            ))}
          </div>
        </main>

        <aside className="right-sidebar">
          <div className="trending-widget glass-panel">
            <h3 className="widget-title">
              <TrendingUp size={18} className="text-accent" /> Trending Topics
            </h3>
            <div className="trending-list">
              {TRENDING_TOPICS.map(topic => (
                <div key={topic.id} className="trending-item">
                  <div className="trending-info">
                    <h4>#{topic.tag}</h4>
                    <span>{topic.count}</span>
                  </div>
                  <ChevronRight size={16} className="text-muted" />
                </div>
              ))}
            </div>
          </div>

          <div className="top-contributors-widget glass-panel">
            <h3 className="widget-title">Top Contributors</h3>
            <p className="widget-subtitle">This month's most helpful members.</p>
            <div className="contributor-list">
              <div className="contributor-item">
                <img src={MOCK_POSTS[0].avatar} alt="User" />
                <div>
                  <h4>Michael Chang</h4>
                  <span>24 contributions</span>
                </div>
              </div>
              <div className="contributor-item">
                <img src={MOCK_POSTS[1].avatar} alt="User" />
                <div>
                  <h4>Emma Wilson</h4>
                  <span>18 contributions</span>
                </div>
              </div>
            </div>
          </div>
        </aside>

      </div>
    </div>
  );
};

export default KnowledgeSharing;
