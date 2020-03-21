import React from "react"
import { graphql,navigate, Link, StaticQuery} from "gatsby"
import './home.css'

export default () => (
    <StaticQuery
    query = {graphql`
    query HomeQuery {
        allContentfulBlog(
            limit: 9
            sort: { fields: [createdAt], order: DESC}
            filter: {
                node_locale: {eq: "en-US",}
            } 
            ) {
            edges {
                node {
                    id
                    slug
                    title
                    author
                    seoUrl
                    authorData{
                        authorName
                        authorSlug
                    }
                    createdAt(formatString: "MMMM DD, YYYY")
                    category {
                        title
                        id
                    }
                    
                    featuredImage {
                        fluid(maxWidth: 600, quality: 85) {
                            src
                            ...GatsbyContentfulFluid
                        }
                    }
                }
            }
        }

    }
`}

render={data => (
    <div className="feed__initial">
    <div className='feed'>
        {data.allContentfulBlog.edges.map(edge => (
            <div key={edge.node.id} className='card'
            style={{
                backgroundImage: `linear-gradient(
                    to bottom,
                    rgba(10, 10, 10, 0) 0%,
                    rgba(10, 10, 10, 0.5) 50%,
                    rgba(10, 10, 10, 0.7) 100%),
                    url(${edge.node.featuredImage.fluid.src})`
                    }}
                onClick={() => navigate(`/blog/${edge.node.slug}`)}>
                {edge.node.category.map(category => (
                    <p className="card__category">{category.title}</p>
                ))}
            <p className="card__title">{edge.node.title}</p>
            </div>
         ))}
    </div>
    <Link className='viewmore_wrapper__link' to={`/blog/2`}>
        <button className='viewmore_wrapper'>
            More Posts
        </button>
    </Link>
    </div>
    )}
    />
)