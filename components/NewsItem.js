import React from 'react'

const NewsItem = (props)=> {
  
  
   let {title, description,imageUrl, Author, date, newsUrl} = props;
    return (
      <div className='my-3'>
        <>
        <div className="card" >
  <img src={!imageUrl?"https://ichef.bbci.co.uk/news/1024/branded_news/C290/production/_128280894_59ece9d477107b576925d496f51092badc87b0f80_0_5500_36671000x667.jpg":imageUrl} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">{title}</h5>
    <p className="card-text">{description}</p>
    <p className="card-text"><small className="text-muted">By {!Author?"Unknown":Author} on {new Date (date).toGMTString()}</small></p>
    <a href={newsUrl} className="btn btn-sm btn-primary">Read More</a>
  </div>
</div>
        </>
      </div>
    )
 
}

export default NewsItem
