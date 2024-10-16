// Importa fireEvent e screen da Testing Library, que são utilizados para simular eventos e interagir com a renderização do componente.
import { fireEvent, screen } from '@testing-library/react'

// Importa o componente Produto que será testado.
import Produto from '..'

// Importa uma função utilitária para renderizar o componente com o Redux Provider, que envolve o componente em um contexto de estado.
import { renderWithProvider } from '../../../utils/tests'

// Objeto jogo, contendo as propriedades de um produto que será utilizado nos testes.
const jogo = {
  id: 2,
  categoria: 'FPS',
  imagem: '',
  plataformas: ['PS4'],
  preco: 149.9,
  precoAntigo: 199.99,
  titulo: 'Cod'
}

// Descrição do bloco de testes para o componente Produto.
describe('tests for the product component', () => {
  // Primeiro teste: Verifica se o componente renderiza corretamente com as informações do produto.
  test('Must renderize correctly', () => {
    // Renderiza o componente Produto com o jogo passado como props utilizando o renderWithProvider para envolver o Redux Provider.
    renderWithProvider(<Produto game={jogo} />)
    // Verifica se o título do jogo "Cod" está presente no documento renderizado.
    expect(screen.getByText('Cod')).toBeInTheDocument()
  })

  // Segundo teste: Verifica se um item é adicionado ao carrinho corretamente ao clicar no botão.
  test('Must add an item in the cart', () => {
    // Renderiza o componente Produto e obtém a store (estado do Redux) a partir do renderWithProvider.
    const { store } = renderWithProvider(<Produto game={jogo} />)
    // Encontra o botão de adicionar o produto ao carrinho no DOM através do atributo data-testid.
    const btn = screen.getByTestId('btn-add-product')
    // Simula um clique no botão de adicionar ao carrinho.
    fireEvent.click(btn)
    // Verifica se o item foi adicionado ao carrinho verificando o estado do Redux. O estado deve conter 1 item.
    expect(store.getState().carrinho.itens).toHaveLength(1)
  })
})
