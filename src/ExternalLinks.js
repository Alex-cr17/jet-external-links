import React from 'react';

const ExternalLinksComponent = (props) => {

    const { links, column_title= 'name', column_icon= 'image', column_link='url' } = props;

    return (
    <div className="row">
      {links && links.length && links.map(link => (
        <div className="col-1-of-8 item" key={link.id}>
          <a href={link[column_link]} target="_blank" rel="noopener noreferrer">
            <img src={link[column_icon]} alt={link[column_title]} />
            <span>{link[column_title]}</span>
          </a>
        </div>
      ))}
    </div>
    );
}

export default ExternalLinksComponent;
