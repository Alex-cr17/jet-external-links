import React, {useEffect, useState} from 'react';

const getUnionTags = (data) => {
  let mergedTags = [];
  data.forEach((link) => {
    if (Array.isArray(link.tags)) {
      link.tags.forEach((tag) => {
        if (!mergedTags.includes(tag)) {
          mergedTags.push(tag)
        }
      })
    }
  })
  return mergedTags;
}

const ExternalLinksComponent = (props) => {
  const {api_token, api_url, column_title= 'name', column_icon= 'image', column_link='url'} = props;
  const [loaded, setLoaded] = useState(false);
  const [data, setData] = useState([]);
  const [activeTag, setActiveTag] = useState('');
  const [tags, setTags] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const fetchData = (page) => {
    if (api_token && api_url) {
      fetch(`https://data.jetadmin.io${api_url}?page=${page}`, {
        headers: {
          'Authorization': `Bearer ${api_token}`,
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then(responseData => {
          setData(prevData => {
            return [...prevData, ...responseData.results]
          });
          if (responseData.next) {
            fetchData(page + 1)
          } else {
            setLoaded(true);

          }
        })
        .catch(error => {
          console.error(error)
          setData([]);
          setLoaded(true);
        });
    }
  }

  useEffect(() => {
    if (data.length > 0) {

      const unionTags = getUnionTags(data)
      if (unionTags.length) {
        setTags(getUnionTags(data))
        setActiveTag(unionTags[0])
        setFilteredData(data.filter(link => (Array.isArray(link.tags) && link.tags.includes(unionTags[0]))))
      } else {
        setFilteredData(data)
      }
    }
  }, [data]);

  useEffect(() => {
    fetchData(1)
  }, [api_token, api_url])

  const handleActiveTag = (activeTag)  => {
    setFilteredData(data.filter(link => (Array.isArray(link.tags) && link.tags.includes(activeTag))))
    setActiveTag(activeTag)
  }

  return (
    loaded ?
      <>
        <div className="wrapper-tags">
          {tags.length ? tags.map((tag) => <div key={tag} onClick={() => handleActiveTag(tag)} className={`tags-item ${activeTag === tag && 'active'}`}>{tag}</div>) : ''}
        </div>
        <div className="row">
          {filteredData.map(link => (
            <div className="col-1-of-6 item" key={link.id}>
              <a href={link[column_link]} target="_blank" rel="noopener noreferrer">
                <img src={link[column_icon]} alt={link[column_title]}/>
                <span>{link[column_title]}</span>
              </a>
            </div>
          ))}
        </div>
      </>
      : <p className="loading">Loading...</p>
  );
}

export default ExternalLinksComponent;
