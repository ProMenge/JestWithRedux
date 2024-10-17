// Importa 'rest' do msw (Mock Service Worker) para definir as rotas que serão "mockadas".
import { rest } from 'msw'
// Importa 'setupServer' do msw/node para criar um servidor que intercepta as requisições durante os testes.
import { setupServer } from 'msw/node'

// Importa o componente Produtos, que será testado.
import Produtos from '..'
// Função customizada para renderizar o componente com o Redux Provider.
import { renderWithProvider } from '../../../utils/tests'
// Importa 'screen' para interagir com o DOM e 'waitFor' para aguardar ações assíncronas (como respostas de API) serem completadas.
import { screen, waitFor } from '@testing-library/react'

// Define os dados que serão retornados no mock da API. Esses dados simulam a resposta de uma API real.
const mocks = [
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
  },
  {
    id: 3,
    categoria: 'Fight',
    imagem: ``,
    plataformas: ['PS4, PS5, PC, XBOX'],
    preco: 150,
    precoAntigo: 199.99,
    titulo: 'Dragon Ball Sparking Zero'
  },
  {
    id: 4,
    categoria: 'Horror',
    imagem: ``,
    plataformas: ['PS4, PS5, PC, XBOX'],
    preco: 200,
    precoAntigo: 299.99,
    titulo: 'Until Dawn'
  }
]

// Cria um servidor de mock utilizando MSW. O servidor intercepta requisições para a URL 'http://localhost:4000/produtos'.
// Quando uma requisição GET é feita para essa URL, ele retorna os dados definidos em 'mocks'.
const server = setupServer(
  rest.get(
    'http://localhost:4000/produtos',
    (requisition, response, context) => {
      return response(context.json(mocks)) // Responde com os dados em formato JSON.
    }
  )
)

// Bloco de testes para o container 'Produtos'.
describe('Tests for the Products Container', () => {
  // beforeAll: Executa antes de todos os testes. Aqui, o servidor de mock é iniciado, para começar a interceptar as requisições.
  beforeAll(() => server.listen())

  // afterEach: Executa após cada teste. Reseta qualquer manipulação feita nos handlers para garantir que os testes sejam independentes.
  afterEach(() => server.resetHandlers())

  // afterAll: Executa após todos os testes. Fecha o servidor para garantir que não haja interferência em outros testes.
  afterAll(() => server.close())

  // Primeiro teste: Verifica se o componente exibe uma mensagem de "Carregando..." enquanto espera a resposta da API.
  test('Must renderize correctly w/ loading', () => {
    renderWithProvider(<Produtos />) // Renderiza o componente com o Redux Provider.
    // Verifica se o texto "Carregando..." está presente na tela enquanto os dados da API não chegam.
    expect(screen.getByText('Carregando...')).toBeInTheDocument()
  })

  // Segundo teste: Verifica se os jogos são renderizados corretamente após a API responder.
  test('Must renderize correctly w/ the games', async () => {
    const { debug } = renderWithProvider(<Produtos />)
    // A função waitFor espera que o conteúdo seja renderizado após os dados da API serem recebidos.
    await waitFor(() => {
      debug() // O debug imprime o estado atual do DOM no console, útil para depuração.
      // Verifica se o jogo "Dragon Ball Sparking Zero" foi renderizado corretamente.
      expect(screen.getByText('Dragon Ball Sparking Zero'))
    })
  })
})
