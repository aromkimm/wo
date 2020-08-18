import React, { useContext } from 'react'
import { Link } from 'gatsby'

import {
  GlobalDispatchContext,
  GlobalStateContext,
} from '../context/GlobalContextProvider'
import Header from '../components/header'
import Popup from '../components/popup'

const MainPage = ({ pageContext }) => {
  const dispatch = useContext(GlobalDispatchContext)
  const state = useContext(GlobalStateContext)

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
                  opacity: `${state.popupClosed ? '' : .2}`
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
        if (!state.popupClosed) {
          return <Popup closePopup={() => dispatch({type: 'CLOSE_POPUP'})} />
        }
      })()
    }
  </div>
  )
}

export default MainPage