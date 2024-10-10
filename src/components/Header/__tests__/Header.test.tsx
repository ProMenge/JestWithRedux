import { screen } from '@testing-library/react'
import Header from '..'
import { renderWithProvider } from '../../../utils/tests'

describe('Tests for Header component', () => {
  test('Must Renderize correctly', () => {
    renderWithProvider(<Header />)
    expect(screen.getByText('EBAC Games')).toBeInTheDocument()
  })

  test(`Must ren derize w/ 2 itens in the cart`, () => {
    renderWithProvider(<Header />, {
      preloadedState: {
        carrinho: {
          itens: [
            {
              id: 1,
              categoria: 'RPG',
              imagem: ``,
              plataformas: ['Windows'],
              preco: 150.9,
              precoAntigo: 199.99,
              titulo: 'Elden Ring'
            },
            {
              id: 2,
              categoria: 'FPS',
              imagem: ``,
              plataformas: ['PS4'],
              preco: 149.9,
              precoAntigo: 199.99,
              titulo: 'Cod'
            }
          ]
        }
      }
    })
    expect(screen.getByTestId(`qtd-cart`).innerHTML).toContain(`2 itens`)
  })
})
