import React, { useState, useEffect } from 'react';

const CoordenadoresIndex = () => {
  const [selectedCoordinator, setSelectedCoordinator] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [newCoordinator, setNewCoordinator] = useState({
    nome: '',
    codigoCoordenador: '',
    nivelAcesso: '',
    telefone: '',
    email: '',
    status: 'Ativo',
    endereco: '',
    dataContratacao: ''
  });

  // Estado inicial para os coordenadores
  const [coordenadores, setCoordenadores] = useState([]);

  // Função para carregar coordenadores da API
  const fetchCoordenadores = async () => {
    try {
      const response = await fetch('https://mediotec-backend.onrender.com/api/coordenadores'); // Use a rota correta
      if (!response.ok) {
        throw new Error('Erro na resposta da API');
      }
      const data = await response.json();
      setCoordenadores(data);
    } catch (error) {
      console.error('Erro ao carregar os coordenadores:', error);
    }
  };

  // Carrega os coordenadores quando o componente é montado
  useEffect(() => {
    fetchCoordenadores();
  }, []);

  const openModal = (coordenador) => {
    setSelectedCoordinator(coordenador);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedCoordinator(null);
    setIsModalOpen(false);
  };

  const openAddModal = () => {
    setNewCoordinator({
      nome: '',
      codigoCoordenador: '',
      nivelAcesso: '',
      telefone: '',
      email: '',
      status: 'Ativo',
      endereco: '',
      dataContratacao: ''
    });
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };

  const openEditModal = (coordenador) => {
    setSelectedCoordinator(coordenador);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCoordinator((prevCoordinator) => ({
      ...prevCoordinator,
      [name]: value
    }));
  };

  const handleAddCoordinator = async (e) => {
    e.preventDefault();

    console.log('Dados do coordenador:', newCoordinator);

    try {
      const response = await fetch('https://mediotec-backend.onrender.com/api/coordenadores', { // Use a rota correta
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCoordinator),
      });

      if (response.ok) {
        await fetchCoordenadores(); // Atualiza a lista de coordenadores
        closeAddModal();
      } else {
        console.error('Erro ao adicionar coordenador');
      }
    } catch (error) {
      console.error('Erro ao adicionar coordenador:', error);
    }
  };

  const handleEditCoordinator = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`https://mediotec-backend.onrender.com/api/coordenadores/${selectedCoordinator._id}`, { // Use a rota correta
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedCoordinator),
      });

      if (response.ok) {
        await fetchCoordenadores(); // Atualiza a lista de coordenadores
        closeEditModal();
      } else {
        console.error('Erro ao editar coordenador');
      }
    } catch (error) {
      console.error('Erro ao editar coordenador:', error);
    }
  };

  const handleDeleteCoordinator = async (id) => {
    try {
      const response = await fetch(`https://mediotec-backend.onrender.com/api/coordenadores/${id}`, { // Use a rota correta
        method: 'DELETE',
      });

      if (response.ok) {
        await fetchCoordenadores(); // Atualiza a lista de coordenadores
      } else {
        console.error('Erro ao remover coordenador');
      }
    } catch (error) {
      console.error('Erro ao remover coordenador:', error);
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
          <li><a href="https://mediotec.netlify.app/Coordenadores" className="text-white hover:bg-white hover:text-black px-4 py-2 block rounded"> Coordenadores</a></li>
            <li><a href="https://mediotec.netlify.app/professores" className="text-white hover:bg-white hover:text-black px-4 py-2 block rounded"> Professores</a></li>
            

            <li><a href="https://mediotec.netlify.app" className="text-white hover:bg-white hover:text-black px-4 py-2 block rounded">Sair</a></li>
          </ul>
          <img
      src="images/mediotec-mobile.png"
      alt="mediotec"
      className="w-32 h-16  ml-10"
    />

        </nav>

        
        {/* Conteúdo principal */}
        <main className="flex-1 p-8 overflow-y-auto" style={{ backgroundColor: '#D9E0F2' }}>
          <header className="flex justify-between items-center mb-6">
            <h1 className="text-black text-2xl">Gerenciamento de Coordenadores</h1>
            <button onClick={openAddModal} className="bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-300">
              + ADICIONAR
            </button>
          </header>

          <div className="overflow-x-auto">
            <table className="w-full table-auto bg-white rounded-lg">
              <thead className="bg-blue-800 text-white">
                <tr>
                  <th className="p-4 text-left">Nome</th>
                  <th className="p-4 text-left">Código Coordenador</th>
                  <th className="p-4 text-left">Nível de Acesso</th>
                  <th className="p-4 text-left">Telefone</th>
                  <th className="p-4 text-left">Ações</th>
                </tr>
              </thead>
              <tbody>
                {coordenadores.map((coordenador, index) => (
                  <tr key={index} className={`cursor-pointer ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
                    <td className="p-4">{coordenador.nome}</td>
                    <td className="p-4">{coordenador.codigoCoordenador}</td>
                    <td className="p-4">{coordenador.nivelAcesso}</td>
                    <td className="p-4">{coordenador.telefone}</td>
                  <td className="p-4 flex space-x-2">
                      <button
                        onClick={() => openEditModal(coordenador)}
                        className="bg-green-400 text-white px-4 py-2 rounded hover:bg-green-300"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDeleteCoordinator(coordenador._id)}
                        className="bg-red-400 text-white px-4 py-2 rounded hover:bg-red-300"
                      >
                        Remover
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          </div>
          {/* Modal */}
          {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
              <div className="bg-white p-8 rounded-lg w-96 relative">
                <button onClick={closeModal} className="absolute top-4 right-4 text-xl font-bold">&times;</button>
                <h2 className="text-2xl mb-4">{selectedCoordinator.nome}</h2>
                <p><strong>Código:</strong> {selectedCoordinator.codigoCoordenador}</p>
                <p><strong>Nível de Acesso:</strong> {selectedCoordinator.nivelAcesso}</p>
                <p><strong>Email:</strong> {selectedCoordinator.email}</p>
                <p><strong>Status:</strong> {selectedCoordinator.status}</p>
                <p><strong>Endereço:</strong> {selectedCoordinator.endereco}</p>
                <p><strong>Data de Contratação:</strong> {selectedCoordinator.dataContratacao}</p>
              </div>
            </div>
          )}

          {/* Modal de adição de coordenador */}
          {isAddModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
              <div className="bg-white p-4 rounded-lg w-full max-w-md max-h-screen overflow-y-auto relative">
                <button onClick={closeAddModal} className="absolute top-4 right-4 text-xl font-bold">&times;</button>
                <h2 className="text-2xl mb-4">Adicionar Coordenador</h2>
                <form onSubmit={handleAddCoordinator} className="space-y-4">
                  {/* Campos do formulário */}
                  {['nome', 'codigoCoordenador', 'nivelAcesso', 'telefone', 'email', 'endereco', 'dataContratacao'].map((field) => (
                    <div key={field} className="flex flex-col">
                      <label className="block text-gray-700 capitalize">{field}</label>
                      <input
                        type={field === 'dataContratacao' ? 'date' : field === 'email' ? 'email' : 'text'}
                        name={field}
                        value={newCoordinator[field]}
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
                      value={newCoordinator.status}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Ativo">Ativo</option>
                      <option value="Inativo">Inativo</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-400"
                  >
                    Adicionar Coordenador
                  </button>
                </form>
              </div>
            </div>
          )}


           {/* Modal de edição */}
           {isEditModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
              <div className="bg-white p-8 rounded-lg w-96 relative">
                <button onClick={closeEditModal} className="absolute top-4 right-4 text-xl font-bold">&times;</button>
                <h2 className="text-2xl mb-4">Editar Coordenador</h2>
                <form onSubmit={handleEditCoordinator}>
                  <input
                    type="text"
                    name="nome"
                    value={selectedCoordinator.nome}
                    onChange={(e) =>
                      setSelectedCoordinator((prev) => ({ ...prev, nome: e.target.value }))
                    }
                    placeholder="Nome"
                    className="w-full p-2 border mb-4"
                    required
                  />
                  <input
                    type="text"
                    name="codigoCoordenador"
                    value={selectedCoordinator.codigoCoordenador}
                    onChange={(e) =>
                      setSelectedCoordinator((prev) => ({
                        ...prev,
                        codigoCoordenador: e.target.value,
                      }))
                    }
                    placeholder="Código Coordenador"
                    className="w-full p-2 border mb-4"
                    required
                  />
                  <input
                    type="text"
                    name="nivelAcesso"
                    value={selectedCoordinator.nivelAcesso}
                    onChange={(e) =>
                      setSelectedCoordinator((prev) => ({
                        ...prev,
                        nivelAcesso: e.target.value,
                      }))
                    }
                    placeholder="Nível de Acesso"
                    className="w-full p-2 border mb-4"
                    required
                  />
                  <input
                    type="text"
                    name="telefone"
                    value={selectedCoordinator.telefone}
                    onChange={(e) =>
                      setSelectedCoordinator((prev) => ({
                        ...prev,
                        telefone: e.target.value,
                      }))
                    }
                    placeholder="Telefone"
                    className="w-full p-2 border mb-4"
                    required
                  />
                  <button
                    type="submit"
                    className="bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-300"
                  >
                    Salvar Alterações
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

export default CoordenadoresIndex;
