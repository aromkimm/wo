import React, { useState, useEffect } from 'react'
import { navigate, Link, StaticQuery, graphql } from 'gatsby'

const Header = ({ menuList, background }) => {
  const [hash, setHash] = useState(null)

  useEffect(() => {
    function handleActiveMenu () {
      setHash(window.location.hash.split('#')[1])
    }
    window.addEventListener('hashchange', handleActiveMenu)
    return () => window.removeEventListener('hashchange', handleActiveMenu)
  })

  return (
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
            <button onClick={() => {
              hash
                ? navigate(`#${hash}`, {replace: true})
                : navigate('/')
            }}>
              <img
                src={`/${data.site.siteMetadata.logo}`}
                alt={data.site.siteMetadata.title}
              />
            </button>
          </h1>
          <nav>
            <ul>
              <li>
                <Link activeClassName="active" to="/all">ALL</Link>
              </li>
            </ul>
            <ul>
              {menuList.map(menu => (
                <li key={menu.index}>
                  <Link
                    activeClassName="active"
                    className={`${hash === menu.category ? 'active' : ''}`}
                    partiallyActive={true}
                    to={`/${menu.category}`}
                  >
                    {menu.category.toUpperCase()}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </header>
      )}
    />
  )
}

export default Header
