import Enzyme, { mount, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
Enzyme.configure({ adapter: new Adapter() })

import React from 'react'
import ReactDOM from 'react-dom'
import { MemoryRouter } from 'react-router-dom'

import App from '../components/App'
import Core from '../components/Core/Core'
import Home from '../components/Core/Home'
import About from '../components/Core/About'
import Help from '../components/Core/Help'
import NotFound from '../components/Core/NotFound'

describe('App Core Functionality: ', () => {
  test('it renders without crashing', () => {
    const tree = shallow(<App />)
    expect(tree.find('div#app')).toHaveLength(1)
  })

  test('that / renders the Home page', () => {
    const appWrapper = mount(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    )
    expect(appWrapper.find(Core)).toHaveLength(1)
    const Page = appWrapper.find(Core).props().page

    const pageWrapper = shallow(Page)
    expect(pageWrapper.find('div#home')).toHaveLength(1)
  })

  test('that /about renders the About page', () => {
    const appWrapper = mount(
      <MemoryRouter initialEntries={['/about']}>
        <App />
      </MemoryRouter>
    )
    expect(appWrapper.find(Core)).toHaveLength(1)
    const Page = appWrapper.find(Core).props().page

    const pageWrapper = shallow(Page)
    expect(pageWrapper.find('div#about')).toHaveLength(1)
  })

  test('that /help renders the Help page', () => {
    const appWrapper = mount(
      <MemoryRouter initialEntries={['/help']}>
        <App />
      </MemoryRouter>
    )
    expect(appWrapper.find(Core)).toHaveLength(1)
    const Page = appWrapper.find(Core).props().page

    const pageWrapper = shallow(Page)
    expect(pageWrapper.find('div#help')).toHaveLength(1)
  })

  test('that an unknown route renders the NotFound page', () => {
    const appWrapper = mount(
      <MemoryRouter initialEntries={['/random']}>
        <App />
      </MemoryRouter>
    )
    expect(appWrapper.find(Core)).toHaveLength(1)
    const Page = appWrapper.find(Core).props().page

    const pageWrapper = shallow(Page)
    expect(pageWrapper.find('div#not-found')).toHaveLength(1)
  })
})
