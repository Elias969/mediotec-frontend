import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
const ComunicadosScreen = () => {
  const [selectedComunicado, setSelectedComunicado] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newComunicado, setNewComunicado] = useState({
    titulo: '',
    descricao: '',
    dataPublicacao: '',
    status: 'Publicado',
  });

  // Estado inicial para os comunicados
  const [comunicados, setComunicados] = useState([]);

  // Função para carregar comunicados da API
  const fetchComunicados = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/comunicados'); // Rota correta da API
      if (!response.ok) {
        throw new Error('Erro na resposta da API');
      }
      const data = await response.json();
      setComunicados(data);
    } catch (error) {
      console.error('Erro ao carregar os comunicados:', error);
    }
  };

  // Carrega os comunicados quando o componente é montado
  useEffect(() => {
    fetchComunicados();
  }, []);

  const openModal = (comunicado) => {
    setSelectedComunicado(comunicado);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedComunicado(null);
    setIsModalOpen(false);
  };

  const openAddModal = () => {
    setNewComunicado({
      titulo: '',
      descricao: '',
      dataPublicacao: '',
      status: 'Publicado',
    });
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewComunicado((prevComunicado) => ({
      ...prevComunicado,
      [name]: value,
    }));
  };

  const handleAddComunicado = async (e) => {
    e.preventDefault();

    console.log('Dados do comunicado:', newComunicado);

    try {
      const response = await fetch('http://localhost:8080/api/comunicados', { // Rota correta
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newComunicado),
      });

      if (response.ok) {
        await fetchComunicados(); // Atualiza a lista de comunicados
        closeAddModal();
      } else {
        console.error('Erro ao adicionar comunicado');
      }
    } catch (error) {
      console.error('Erro ao adicionar comunicado:', error);
    }
  };

  return (
    <div className="w-full h-screen flex bg-gray-900">
      <div className="flex w-full h-full bg-white rounded-lg overflow-hidden">
        {/* Barra lateral */}
        <nav className="w-64 p-5" style={{ backgroundColor: '#201AE8' }}>
  
        <div className="w-64 text-white" style={{ backgroundColor: '#201AE8' }}>
        <img
  src="https://st4.depositphotos.com/11574170/25191/v/450/depositphotos_251916955-stock-illustration-user-glyph-color-icon.jpg"
  alt="Perfil"
  className="w-32 h-32 rounded-full ml-10"
/>
          </div>
          <ul className="mx-auto mt-10">
          
            <li><a href="http://localhost:5173/Principal" className="text-white hover:bg-white hover:text-black px-4 py-2 block rounded"> Alunos</a></li>
            <li><a href="http://localhost:5173/Turmas" className="text-white hover:bg-white hover:text-black px-4 py-2 block rounded"> Turmas</a></li>
            <li><a href="http://localhost:5173/Conceitos" className="text-white hover:bg-white hover:text-black px-4 py-2 block rounded">Conceitos</a></li>
            <li><a href="http://localhost:5173/Disciplinas" className="text-white hover:bg-white hover:text-black px-4 py-2 block rounded"> Disciplinas</a></li>
            <li><a href="http://localhost:5173/Comunicados" className="text-white hover:bg-white hover:text-black px-4 py-2 block rounded"> Comunicados</a></li>
            <li><a href="http://localhost:5173" className="text-white hover:bg-white hover:text-black px-4 py-2 block rounded">Sair</a></li>
          </ul>
          <img
      src="images/mediotec-mobile.png"
      alt="mediotec"
      className="w-32 h-16  ml-10"
    />

        </nav>

        {/* Conteúdo principal */}
        <main className="flex-1 p-8" style={{ backgroundColor: '#D9E0F2' }}>
          <header className="flex justify-between items-center mb-6">
            <h1 className="text-black text-2xl">Gerenciamento de Comunicados</h1>
            <button onClick={openAddModal} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-400">
              + ADICIONAR
            </button>
          </header>

          <table className="w-full table-auto bg-white rounded-lg overflow-hidden">
          <thead className="bg-blue-800 text-white">
              <tr>
                <th className="p-4 text-left">Título</th>
                <th className="p-4 text-left">Descrição</th>
                <th className="p-4 text-left">Data de Publicação</th>
                <th className="p-4 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {comunicados.map((comunicado, index) => (
                <tr
                  key={index}
                  className={`cursor-pointer ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}
                  onClick={() => openModal(comunicado)}
                >
                  <td className="p-4">{comunicado.titulo}</td>
                  <td className="p-4">{comunicado.descricao}</td>
                  <td className="p-4">{comunicado.dataPublicacao}</td>
                  <td className="p-4">{comunicado.status}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Modal de detalhes */}
          {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
              <div className="bg-white p-8 rounded-lg w-96 relative">
                <button onClick={closeModal} className="absolute top-4 right-4 text-xl font-bold">&times;</button>
                <h2 className="text-2xl mb-4">{selectedComunicado.titulo}</h2>
                <p><strong>Descrição:</strong> {selectedComunicado.descricao}</p>
                <p><strong>Data de Publicação:</strong> {selectedComunicado.dataPublicacao}</p>
                <p><strong>Status:</strong> {selectedComunicado.status}</p>
              </div>
            </div>
          )}

          {/* Modal de adição de comunicado */}
          {isAddModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
              <div className="bg-white p-4 rounded-lg w-full max-w-md max-h-screen overflow-y-auto relative">
                <button onClick={closeAddModal} className="absolute top-4 right-4 text-xl font-bold">&times;</button>
                <h2 className="text-2xl mb-4">Adicionar Comunicado</h2>
                <form onSubmit={handleAddComunicado} className="space-y-4">
                  {/* Campos do formulário */}
                  {['titulo', 'descricao', 'dataPublicacao'].map((field) => (
                    <div key={field} className="flex flex-col">
                      <label className="block text-gray-700 capitalize">{field}</label>
                      <input
                        type={field === 'dataPublicacao' ? 'date' : 'text'}
                        name={field}
                        value={newComunicado[field]}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                  ))}
                  <div className="flex flex-col">
                    <label className="block text-gray-700">Status</label>
                    <select
                      name="status"
                      value={newComunicado.status}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Publicado">Publicado</option>
                      <option value="Rascunho">Rascunho</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-400"
                  >
                    Adicionar Comunicado
                  </button>
                </form>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ComunicadosScreen;