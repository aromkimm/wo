import React, { useState } from 'react'
import { Link } from 'gatsby'

import Header from '../components/header'
import Popup from '../components/popup'

let popupClosed = false

const MainPage = ({ pageContext }) => {
  const [popupVisible, setPopupVisible] = useState(!popupClosed)
  const closePopup = () => {
    setPopupVisible(!popupVisible)
    popupClosed = true
  }

  return (
  <div>
    <Header menuList={pageContext.menuList} background={false} />
    <section style={{paddingTop: 0}}>
      <ul id="images">
      {
        pageContext.menuList.map(menu => {
          const category = menu.category
          const img = pageContext.mainImgList.find(node => node.relativePath.includes(category))
          return (
            <Link key={menu.index} to={`/${category}`}>
              <li
                data-menuanchor={category}
                style={{
                  backgroundImage: `url(${img.publicURL})`,
                  width: '100%',
                  height: '100vh',
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                  transition: 'all .5s ease-in-out',
                  opacity: `${popupVisible ? .2 : ''}`
                }}
              />
            </Link>
          )
        })
      }
      </ul>
    </section>
    {
      (() => {
        if (popupVisible) {
          return <Popup closePopup={closePopup} />
        }
      })()
    }
  </div>
  )
}

export default MainPage