import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, ChevronDown, BookOpen, Video, MessageCircle, Mail,
  HelpCircle, Lightbulb, FileText, ExternalLink, Zap, LifeBuoy
} from 'lucide-react';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import Spinner from '../components/common/Spinner';
import { useDebounce } from '../hooks/useDebounce';
import './Help.css';

// TODO(Vineet): Hardcoded FAQs for now. Will move to the CMS once the backend is ready.
const FAQS = [
  {
    id: 1, category: 'Getting Started',
    question: 'How do I get started with the platform?',
    answer: 'After logging in, complete your profile setup and take the initial skill assessment. The platform will automatically generate a personalized learning path based on your role and identified knowledge gaps.',
  },
  {
    id: 2, category: 'Assessments',
    question: 'How are knowledge gap assessments conducted?',
    answer: 'Assessments use a combination of role-based questionnaires, peer reviews, and performance data. Results are benchmarked against industry standards and team averages to identify specific areas for improvement.',
  },
  {
    id: 3, category: 'Learning Paths',
    question: 'Can I customize my learning path?',
    answer: 'Yes! While the platform auto-generates paths based on gap analysis, you can add, remove, or reorder learning modules. Managers can also assign specific courses to team members.',
  },
  {
    id: 4, category: 'Analytics',
    question: 'What analytics are available for managers?',
    answer: 'Managers have access to team-wide dashboards showing skill distribution, gap trends over time, course completion rates, and individual progress reports. Data can be exported in CSV or PDF format.',
  },
  {
    id: 5, category: 'Privacy',
    question: 'Who can see my assessment results?',
    answer: 'By default, your direct manager and HR can view your results. You can adjust privacy settings in your profile to limit access. Aggregated anonymous data may be used for org-wide analytics.',
  },
  {
    id: 6, category: 'Technical',
    question: 'Which browsers are supported?',
    answer: 'The platform supports the latest versions of Chrome, Firefox, Safari, and Edge. We recommend Chrome for the best experience. Mobile browsers are supported for reading content but assessments are best taken on desktop.',
  },
  {
    id: 7, category: 'Getting Started',
    question: 'How do I invite team members?',
    answer: "Navigate to Settings → Team Management and enter the email addresses of the people you'd like to invite. They'll receive an email with account setup instructions. Bulk import via CSV is also available.",
  },
];

const QUICK_LINKS = [
  { icon: <BookOpen size={24} />, label: 'Documentation', desc: 'Full platform guide', href: '#', color: '#a78bfa' },
  { icon: <Video size={24} />, label: 'Video Tutorials', desc: 'Step-by-step walkthroughs', href: '#', color: '#60a5fa' },
  { icon: <FileText size={24} />, label: 'Release Notes', desc: "What's new", href: '#', color: '#34d399' },
  { icon: <Lightbulb size={24} />, label: 'Best Practices', desc: 'Tips & recommendations', href: '#', color: '#fb923c' },
];

function FaqItem({ item }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div className={`faq-item ${open ? 'open' : ''}`} layout>
      <button className="faq-question" onClick={() => setOpen(p => !p)}>
        <span>{item.question}</span>
        <motion.span className="faq-chevron" animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}>
          <ChevronDown size={18} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            className="faq-answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <p>{item.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Help() {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 400); // 400ms delay to prevent rapid filtering
  const [category, setCategory] = useState('All');
  const [contactSent, setContactSent] = useState(false);
  const [contactLoading, setContactLoading] = useState(false);
  const [contactForm, setContactForm] = useState({ subject: '', message: '' });

  const categories = ['All', ...Array.from(new Set(FAQS.map(f => f.category)))];

  const filtered = useMemo(() => {
    return FAQS.filter(f => {
      const matchSearch = !debouncedSearch || f.question.toLowerCase().includes(debouncedSearch.toLowerCase()) || f.answer.toLowerCase().includes(debouncedSearch.toLowerCase());
      const matchCat = category === 'All' || f.category === category;
      return matchSearch && matchCat;
    });
  }, [debouncedSearch, category]);

  const handleContact = async (e) => {
    e.preventDefault();
    setContactLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setContactLoading(false);
    setContactSent(true);
  };

  return (
    <div className="help-root">
      {/* Hero */}
      <div className="help-hero">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="help-hero-icon"><LifeBuoy size={36} /></div>
          <h1 className="help-hero-title">How can we help?</h1>
          <p className="help-hero-sub">Search our knowledge base or browse FAQs below</p>

          {/* Search */}
          <div className="help-search-wrap">
            <Search size={18} className="help-search-icon" />
            <input
              className="help-search"
              placeholder="Search for answers..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            {search && (
              <button className="help-search-clear" onClick={() => setSearch('')}>×</button>
            )}
          </div>
        </motion.div>
      </div>

      <div className="help-body">
        {/* Quick Links */}
        <motion.section
          className="help-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="help-section-title"><Zap size={18} /> Quick Links</h2>
          <div className="quick-links-grid">
            {QUICK_LINKS.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                className="quick-link-card"
                whileHover={{ scale: 1.04, y: -4 }}
                transition={{ type: 'spring', stiffness: 300 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ '--link-color': link.color }}
              >
                <div className="ql-icon" style={{ color: link.color }}>{link.icon}</div>
                <div>
                  <div className="ql-label">{link.label}</div>
                  <div className="ql-desc">{link.desc}</div>
                </div>
                <ExternalLink size={14} className="ql-ext" />
              </motion.a>
            ))}
          </div>
        </motion.section>

        {/* FAQ */}
        <motion.section
          className="help-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="help-section-title"><HelpCircle size={18} /> Frequently Asked Questions</h2>

          {/* Category Filter */}
          <div className="faq-categories">
            {categories.map(cat => (
              <button
                key={cat}
                className={`faq-cat-btn ${category === cat ? 'active' : ''}`}
                onClick={() => setCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="faq-list">
            <AnimatePresence>
              {filtered.length > 0 ? filtered.map(item => (
                <FaqItem key={item.id} item={item} />
              )) : (
                <motion.div className="faq-empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <Search size={32} />
                  <p>No results for "<strong>{search}</strong>"</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.section>

        {/* Contact Support */}
        <motion.section
          className="help-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="help-section-title"><MessageCircle size={18} /> Contact Support</h2>
          <div className="contact-card">
            {contactSent ? (
              <motion.div className="contact-sent" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                <Mail size={40} className="contact-sent-icon" />
                <h3>Message sent!</h3>
                <p>Our team will respond within 24 hours.</p>
                <button className="contact-again-btn" onClick={() => { setContactSent(false); setContactForm({ subject: '', message: '' }); }}>
                  Send another
                </button>
              </motion.div>
            ) : (
              <form className="contact-form" onSubmit={handleContact}>
                <div className="form-group">
                  <label>Subject</label>
                  <input
                    placeholder="Briefly describe your issue"
                    value={contactForm.subject}
                    onChange={e => setContactForm(p => ({ ...p, subject: e.target.value }))}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Message</label>
                  <textarea
                    rows={4}
                    placeholder="Describe your issue in detail..."
                    value={contactForm.message}
                    onChange={e => setContactForm(p => ({ ...p, message: e.target.value }))}
                    required
                  />
                </div>
                <button type="submit" className="contact-submit-btn" disabled={contactLoading}>
                  {contactLoading ? <Spinner size="sm" /> : <><Mail size={15} /> Send Message</>}
                </button>
              </form>
            )}
          </div>
        </motion.section>
      </div>
    </div>
  );
}
