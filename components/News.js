import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'



const News = (props)=> {
    const [articles, setArticles]= useState([])
    const [loading, setLoading]= useState(true)
    // const [totalresults, setTotalResults]= useState(0)
    const [page, setPage]= useState(1)
   
     const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    document.title = `${capitalizeFirstLetter(props.category)} - VoiceUp`;

    const updateNews = async ()=> {
        props.setProgress(0);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=190643c916f2457a830352799393133c&page=${page+1}&pageSize=${props.pageSize}`;
       
        setLoading(true);
        let data = await fetch(url);
        let parsedData = await data.json()
        setArticles(parsedData.articles)
        setLoading(false)
      
        props.setProgress(100);
    }
    useEffect(() =>{
        updateNews();

    },{})
    

     const handlePrevClick =  () => {
        setPage(page-1)
        updateNews();
    }
 
     const handleNextClick =  () => {
       setPage(page+1)
        updateNews();
    }
 

 

  return (
      <>
           <div className="container my-3">
                <h1 className="text-center" style={{ margin: '35px 0px',marginTop: '90px' }}>VoiceUp - Top {capitalizeFirstLetter(props.category)} Headlines</h1>
                {loading && <Spinner />}
                <div className="row">
                    {!loading && articles.map((element) => {
                        return <div className="col-md-4" key={element.url}>
                            <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} Author={element.author} date={element.publishedAt} source={element.source.name} />
                        </div>
                    })}
                </div>
                <div className="container d-flex justify-content-between">
                    <button disabled={page <= 1} type="button" className="btn btn-dark" onClick={handlePrevClick}> &larr; Previous</button>
                    <button disabled={page >=8} type="button" className="btn btn-dark" onClick={handleNextClick}>Next &rarr;</button>
                </div>
            </div>
      </>
  )

}
News.defaultProps = {
    country: 'us',
    pageSize: 8,
    category: 'general',
}

    News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
}

export default News
