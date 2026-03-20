import React, { useState } from 'react';
import { Database, FileJson, Layers3 } from 'lucide-react';
import { datasetCollections } from '../data/portfolioSuiteData';

const DatasetExplorerApp = () => {
  const [activeId, setActiveId] = useState(datasetCollections[0].id);
  const activeCollection = datasetCollections.find((collection) => collection.id === activeId) || datasetCollections[0];

  return (
    <div className="dataset-app">
      <aside className="dataset-sidebar">
        <div className="dataset-sidebar-top">
          <p className="section-eyebrow">Dataset Explorer</p>
          <h3>Collections</h3>
        </div>
        <div className="dataset-tab-list">
          {datasetCollections.map((collection) => (
            <button
              key={collection.id}
              type="button"
              className={`dataset-tab ${collection.id === activeId ? 'active' : ''}`}
              onClick={() => setActiveId(collection.id)}
            >
              <Database size={16} />
              <span>{collection.title}</span>
            </button>
          ))}
        </div>
      </aside>

      <section className="dataset-main">
        <div className="dataset-main-head">
          <div>
            <p className="section-eyebrow">Collection Detail</p>
            <h2>{activeCollection.title}</h2>
            <p>{activeCollection.type}</p>
          </div>
          <span className="demo-chip"><Layers3 size={14} /> Source: {activeCollection.source}</span>
        </div>

        <div className="dataset-grid">
          <article className="dataset-card">
            <h3>Preprocessing Flow</h3>
            <div className="dataset-step-list">
              {activeCollection.preprocessing.map((item, index) => (
                <div key={item} className="dataset-step">
                  <span>{index + 1}</span>
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </article>

          <article className="dataset-card">
            <div className="dataset-card-head">
              <h3>Sample Record</h3>
              <FileJson size={16} />
            </div>
            <pre className="dataset-sample-code">{activeCollection.sample}</pre>
          </article>
        </div>
      </section>
    </div>
  );
};

export default DatasetExplorerApp;
