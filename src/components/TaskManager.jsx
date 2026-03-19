import { ShieldAlert } from 'lucide-react';

const ProcessIcon = ({ icon: Icon }) => {
  if (!Icon) {
    return null;
  }

  return <Icon size={16} />;
};

const TaskManager = ({ windows, onClose, onFocus, onBsodRequest }) => {
  const processes = Object.entries(windows);

  return (
    <div className="task-manager">
      <div className="tm-header">
        <div>
          <p className="tm-kicker">System Control</p>
          <h3>Task Manager</h3>
        </div>
        <div className="tm-tabs">
          <span className="active">Processes</span>
          <span>Performance</span>
          <span>Users</span>
        </div>
      </div>

      <div className="tm-metrics">
        <div className="tm-metric-card">
          <span>Open apps</span>
          <strong>{processes.length}</strong>
        </div>
        <div className="tm-metric-card">
          <span>Critical services</span>
          <strong>1</strong>
        </div>
        <div className="tm-metric-card">
          <span>Status</span>
          <strong>Stable</strong>
        </div>
      </div>

      <div className="tm-content">
        <table className="tm-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Status</th>
              <th>PID</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {processes.map(([id, win]) => (
              <tr key={id} onClick={() => onFocus(id)} className="tm-row">
                <td>
                  <div className="tm-app-cell">
                    <span className="tm-app-icon">
                      <ProcessIcon icon={win.icon} />
                    </span>
                    <span>{win.title}</span>
                  </div>
                </td>
                <td><span className="status-running">Running</span></td>
                <td>{id.split('-')[1]?.slice(-4) || 'N/A'}</td>
                <td>
                  <button
                    type="button"
                    className="tm-end-task"
                    onClick={(event) => {
                      event.stopPropagation();
                      onClose(id);
                    }}
                  >
                    End Task
                  </button>
                </td>
              </tr>
            ))}

            <tr className="tm-row critical">
              <td>
                <div className="tm-app-cell">
                  <span className="tm-app-icon critical">
                    <ShieldAlert size={16} color="#d83b01" />
                  </span>
                  <span className="critical-text">System Kernel</span>
                </div>
              </td>
              <td><span className="critical-text">Critical</span></td>
              <td>0001</td>
              <td>
                <button
                  type="button"
                  className="tm-end-task danger"
                  onClick={(event) => {
                    event.stopPropagation();
                    onBsodRequest();
                  }}
                >
                  End Task
                </button>
              </td>
            </tr>

            {processes.length === 0 && (
              <tr>
                <td colSpan="4" className="tm-empty-state">
                  No active processes
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TaskManager;
