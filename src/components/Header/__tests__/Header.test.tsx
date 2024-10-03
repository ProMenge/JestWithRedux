import { Provider } from 'react-redux'
import Header from '..'
import { render, screen } from '@testing-library/react'
import { store } from '../../../store'


describe('Tests for Header component', () => {
  test('Must Renderize correctly', () => {
    const { debug } = render(
      <Provider store={store}>
        <Header />
      </Provider>
    )
    debug()
    expect(screen.getByText('EBAC Games')).toBeInTheDocument()
  })
})
