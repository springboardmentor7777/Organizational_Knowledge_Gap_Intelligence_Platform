const fs = require('fs');
const path = require('path');

const components = {
  'employee': ['SkillInventory', 'LearningProgress', 'GapSummary']
};

const pages = [
  'Register', 'ForgotPassword', 'Dashboard', 'EmployeeDashboard', 'ManagerDashboard',
  'HRDashboard', 'AdminDashboard', 'Profile', 'Skills', 'SkillAssessment', 'GapAnalysis',
  'GapVisualization', 'TrainingRecommendations', 'LearningPaths', 'CourseCatalog',
  'TrainingEnrollment', 'Mentorship', 'KnowledgeSharing', 'ExpertDirectory',
  'CommunityGroups', 'Reports', 'Notifications', 'Settings', 'CompetencyFramework',
  'RoleBenchmarking', 'UserManagement', 'AuditLogs', 'Help'
];

const srcDir = path.join(__dirname, 'src');

// Create employee components index
const empIndexStr = components.employee.map(c => `export { default as ${c} } from '../common/PlaceholderComponent';\n`).join('');
fs.writeFileSync(path.join(srcDir, 'components', 'employee', 'index.js'), empIndexStr);

// Create placeholder pages
const pageTemplate = (name) => `import React from 'react';
import Card, { CardHeader, CardTitle, CardDescription } from '../components/common/Card';

const ${name} = () => {
  return (
    <div style={{ padding: '24px' }}>
      <Card padding="lg" glow>
        <CardHeader>
          <CardTitle>${name}</CardTitle>
          <CardDescription>This page is currently under development.</CardDescription>
        </CardHeader>
        <div style={{ height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-tertiary)' }}>
          Coming Soon...
        </div>
      </Card>
    </div>
  );
};

export default ${name};
`;

pages.forEach(page => {
  const filePath = path.join(srcDir, 'pages', `${page}.jsx`);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, pageTemplate(page));
  }
});

console.log('Placeholders created successfully.');
