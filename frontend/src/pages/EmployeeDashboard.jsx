import { motion } from 'framer-motion';
import { Target, Award, BookOpen, Clock } from 'lucide-react';
import { useAuthContext } from '../context/AuthContext';
import StatsCard from '../components/dashboard/StatsCard';
import GapTrendChart from '../components/dashboard/GapTrendChart';
import { 
  SkillDistributionChart, 
  TrainingProgressChart, 
  RecentActivity, 
  QuickActions 
} from '../components/dashboard';
import { GapSummary } from '../components/employee';
import './EmployeeDashboard.css';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
};

const EmployeeDashboard = () => {
  const { user } = useAuthContext();

  return (
    <div className="dashboard-container">
      <motion.div 
        className="dashboard-header"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <div>
          <h1 className="dashboard-title">
            Welcome back, <span className="gradient-text">{user?.firstName}</span>
          </h1>
          <p className="dashboard-subtitle">Here is your knowledge intelligence overview for today.</p>
        </div>
      </motion.div>

      {/* Motivational Banner */}
      <motion.div 
        className="motivational-banner"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="banner-content">
          <Award className="banner-icon" />
          <div>
            <h3>You're making great progress!</h3>
            <p>You've closed 3 skill gaps this month. Keep up the momentum.</p>
          </div>
        </div>
      </motion.div>

      <motion.div 
        className="stats-grid"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={itemVariants}>
          <StatsCard title="Overall Gap Score" value="78" trend="up" trendValue="+5%" icon={Target} color="purple" />
        </motion.div>
        <motion.div variants={itemVariants}>
          <StatsCard title="Skills Assessed" value="24" trend="up" trendValue="+2 this week" icon={Award} color="emerald" />
        </motion.div>
        <motion.div variants={itemVariants}>
          <StatsCard title="Courses Enrolled" value="3" trend="neutral" trendValue="On track" icon={BookOpen} color="cyan" />
        </motion.div>
        <motion.div variants={itemVariants}>
          <StatsCard title="Learning Hours" value="45h" trend="up" trendValue="+12h this month" icon={Clock} color="amber" />
        </motion.div>
      </motion.div>

      <motion.div 
        className="dashboard-main-grid"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <div className="dashboard-left-col">
          <motion.div variants={itemVariants} className="chart-wrapper">
            <GapTrendChart />
          </motion.div>
          
          <div className="dashboard-row-2">
            <motion.div variants={itemVariants} className="chart-wrapper">
              <SkillDistributionChart title="Skill Distribution" description="Proficiency across core competencies" />
            </motion.div>
            <motion.div variants={itemVariants} className="chart-wrapper">
              <TrainingProgressChart title="Training Progress" description="Your current learning paths" />
            </motion.div>
          </div>
          
          <motion.div variants={itemVariants}>
            <QuickActions title="Quick Actions" description="Fast track to your most used tools" />
          </motion.div>
        </div>

        <div className="dashboard-right-col">
          <motion.div variants={itemVariants} className="sidebar-widget">
            <GapSummary title="Gap Summary" description="Overview of areas needing improvement" />
          </motion.div>
          
          <motion.div variants={itemVariants} className="sidebar-widget flex-1">
            <RecentActivity title="Recent Activity" description="Your latest platform interactions" />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default EmployeeDashboard;
