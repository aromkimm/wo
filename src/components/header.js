import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'

const Header = ({ menuList, background }) => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            logo
            title
          }
        }
      }
    `}
    render={data => (
      <header style={{ background: `${background ? '#fff' : null}` }}>
        <h1>
          <Link to={window.location.hash ? null : '/'}>
            <img
              src={`/${data.site.siteMetadata.logo}`}
              alt={data.site.siteMetadata.title}
            />
          </Link>
        </h1>
        <nav id="menu">
          <ul>
            <Link activeClassName="active" to="/all">
              <li>ALL</li>
            </Link>
          </ul>
          <ul>
            {menuList.map(menu => (
              <Link
                activeClassName="active"
                partiallyActive={true}
                key={menu.index}
                to={`/${menu.category}`}
              >
                <li>{menu.category.toUpperCase()}</li>
              </Link>
            ))}
          </ul>
        </nav>
      </header>
    )}
  />
)

export default Header
