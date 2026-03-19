import { X, LayoutGrid, Terminal, ShieldAlert } from 'lucide-react';

const TaskManager = ({ windows, onClose, onFocus, onBsod }) => {
  return (
    <div className="task-manager">
      <div className="tm-header">
        <div className="tm-tabs">
          <span className="active">Processes</span>
          <span>Performance</span>
          <span>Users</span>
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
            {Object.entries(windows).map(([id, win]) => (
              <tr key={id} onClick={() => onFocus(id)} style={{ cursor: 'pointer' }}>
                <td>
                  <div className="tm-app-cell">
                    {React.createElement(win.icon, { size: 16 })}
                    <span>{win.title}</span>
                  </div>
                </td>
                <td><span className="status-running">Running</span></td>
                <td>{id.split('-')[1]?.slice(-4) || 'N/A'}</td>
                <td>
                  <button 
                    className="tm-end-task"
                    onClick={(e) => {
                      e.stopPropagation();
                      onClose(id);
                    }}
                  >
                    End Task
                  </button>
                </td>
              </tr>
            ))}
            <tr style={{ cursor: 'not-allowed', background: 'rgba(255,0,0,0.05)' }}>
              <td>
                <div className="tm-app-cell">
                  <ShieldAlert size={16} color="#d83b01" />
                  <span style={{ color: '#d83b01', fontWeight: 'bold' }}>System Kernel</span>
                </div>
              </td>
              <td><span style={{ color: '#d83b01' }}>Critical</span></td>
              <td>0001</td>
              <td>
                <button 
                  className="tm-end-task"
                  style={{ background: '#ffd0d0', color: '#d83b01', borderColor: '#d83b01' }}
                  onClick={(e) => {
                    e.stopPropagation();
                    if(confirm("CRITICAL: Ending this process will cause system instability. Proceed?")) {
                      onBsod();
                    }
                  }}
                >
                  End Task
                </button>
              </td>
            </tr>
            {Object.keys(windows).length === 0 && (
              <tr>
                <td colSpan="4" style={{ textAlign: 'center', padding: '20px', opacity: 0.5 }}>
                  No active processes
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <style>{`
        .task-manager {
          height: 100%;
          display: flex;
          flex-direction: column;
          background: #f3f3f3;
          color: #333;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        .tm-header {
          background: #fff;
          border-bottom: 1px solid #ddd;
          padding: 0 10px;
        }
        .tm-tabs {
          display: flex;
          gap: 20px;
        }
        .tm-tabs span {
          padding: 10px 5px;
          font-size: 13px;
          cursor: pointer;
          border-bottom: 3px solid transparent;
        }
        .tm-tabs span.active {
          border-bottom-color: #0078d7;
          font-weight: 600;
        }
        .tm-content {
          flex: 1;
          overflow: auto;
          background: #fff;
        }
        .tm-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 13px;
        }
        .tm-table th {
          text-align: left;
          padding: 8px 12px;
          background: #f9f9f9;
          border-bottom: 1px solid #eee;
          position: sticky;
          top: 0;
        }
        .tm-table td {
          padding: 6px 12px;
          border-bottom: 1px solid #f0f0f0;
        }
        .tm-table tr:hover {
          background: #e5f3ff;
        }
        .tm-app-cell {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .status-running {
          color: #107c10;
          font-weight: 600;
        }
        .tm-end-task {
          padding: 4px 12px;
          background: #efefef;
          border: 1px solid #ccc;
          border-radius: 4px;
          font-size: 12px;
          cursor: pointer;
        }
        .tm-end-task:hover {
          background: #e5e5e5;
          border-color: #999;
          color: #d83b01;
        }
      `}</style>
    </div>
  );
};

export default TaskManager;
