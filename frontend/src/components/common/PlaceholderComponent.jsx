import Card, { CardHeader, CardTitle, CardDescription } from '../common/Card';

const PlaceholderComponent = ({ title, description }) => (
  <Card padding="md" variant="default" glow>
    <CardHeader>
      <CardTitle>{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
    <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-tertiary)' }}>
      Interactive visualization coming soon...
    </div>
  </Card>
);

export default PlaceholderComponent;
