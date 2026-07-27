function DashboardCard({ title, value, icon, color }) {
  return (
    <div className="col-md-3 mb-3">
      <div className={`card border-${color} shadow`}>
        <div className="card-body text-center">
          <i className={`bi ${icon} fs-1 text-${color}`}></i>
          <h5 className="mt-3">{title}</h5>
          <h2>{value}</h2>
        </div>
      </div>
    </div>
  );
}

export default DashboardCard;