import React, { useState, useEffect } from 'react';

const Turmas = () => {
  const [selectedTurma, setSelectedTurma] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [newTurma, setNewTurma] = useState({
     nome: '',
  nomeProfessor: '',
  periodo: '',
  numerodealunos: '', 
});

  const [turmas, setTurmas] = useState([



    {
      nome: '1A',
      nomeProfessor: 'Prof. João Mendes',
      periodo: 'Matutino',
      numerodealunos: 25,
    },
    {
      nome: '2B',
      nomeProfessor: 'Profª. Mariana Alves',
      periodo: 'Vespertino',
      numerodealunos: 20,
    },
    {
      nome: '1B',
      nomeProfessor: 'Prof. Ricardo Lima',
      periodo: 'Matutino',
      numerodealunos: 22,
    },
    {
      nome: '3A',
      nomeProfessor: 'Profª. Juliana Santos',
      periodo: 'Noturno',
      numerodealunos: 18,
    },
    {
      nome: '1C',
      nomeProfessor: 'Prof. André Pereira',
      periodo: 'Matutino',
      numerodealunos: 30,
    },


  ]);

  // Função para carregar as turmas da API
  const fetchTurmas = async () => {
    try {
      const response = await fetch('https://mediotec-backend.onrender.com/api/turmas'); // Rota correta da API
      if (!response.ok) {
        throw new Error('Erro na resposta da API');
      }
      const data = await response.json();
      setTurmas(data);
    } catch (error) {
      console.error('Erro ao carregar as turmas:', error);
    }
  };

  // Carregar as turmas quando o componente é montado
  useEffect(() => {
    fetchTurmas();
  }, []);

  const openModal = (turma) => {
    setSelectedTurma(turma);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedTurma(null);
    setIsModalOpen(false);
  };

  const openAddModal = () => {
    setNewTurma({
      nome: '',
      nomeProfessor: '',
      periodo: '',
      numerodealunos: '', 
    });
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };

  const openUpdateModal = (turma) => {
    setNewTurma(turma);
    setSelectedTurma(turma);
    setIsUpdateModalOpen(true);
  };

  const closeUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setSelectedTurma(null);
  };

  const openDeleteModal = (turma) => {
    setSelectedTurma(turma);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedTurma(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTurma((prevTurma) => ({
      ...prevTurma,
      [name]: value
    }));
  };

  const handleAddTurma = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://mediotec-backend.onrender.com/api/turmas', { // Rota correta da API
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTurma),
      });

      if (response.ok) {
        await fetchTurmas(); // Atualiza a lista de turmas
        closeAddModal();
      } else {
        console.error('Erro ao adicionar turma');
      }
    } catch (error) {
      console.error('Erro ao adicionar turma:', error);
    }
  };

  const handleUpdateTurma = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://mediotec-backend.onrender.com/api/turmas/${selectedTurma.id}`, { // Rota correta da API
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTurma),
      });

      if (response.ok) {
        await fetchTurmas(); // Atualiza a lista de turmas
        closeUpdateModal();
      } else {
        console.error('Erro ao atualizar turma');
      }
    } catch (error) {
      console.error('Erro ao atualizar turma:', error);
    }
  };

  const handleDeleteTurma = async () => {
    try {
      const response = await fetch(`https://mediotec-backend.onrender.com/api/turmas/${selectedTurma.id}`, { // Rota correta da API
        method: 'DELETE',
      });

      if (response.ok) {
        await fetchTurmas(); // Atualiza a lista de turmas
        closeDeleteModal();
      } else {
        console.error('Erro ao remover turma');
      }
    } catch (error) {
      console.error('Erro ao remover turma:', error);
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
            
            <li><a href="https://mediotec.netlify.app/Principal" className="text-white hover:bg-white hover:text-black px-4 py-2 block rounded">Alunos</a></li>
            <li><a href="https://mediotec.netlify.app/Turmas" className="text-white hover:bg-white hover:text-black px-4 py-2 block rounded">Turmas</a></li>
            <li><a href="https://mediotec.netlify.app/Conceitos" className="text-white hover:bg-white hover:text-black px-4 py-2 block rounded">Conceitos</a></li>
            <li><a href="https://mediotec.netlify.app/Disciplinas" className="text-white hover:bg-white hover:text-black px-4 py-2 block rounded">Disciplinas</a></li>
            <li><a href="https://mediotec.netlify.app/Comunicados" className="text-white hover:bg-white hover:text-black px-4 py-2 block rounded">Comunicados</a></li>
            <li><a href="https://mediotec.netlify.app" className="text-white hover:bg-white hover:text-black px-4 py-2 block rounded">Sair</a></li>
          </ul>
          <img
            src="images/mediotec-mobile.png"
            alt="mediotec"
            className="w-32 h-16 ml-10"
          />
        </nav>

        {/* Conteúdo principal */}
        <main className="flex-1 p-8 overflow-y-auto" style={{ backgroundColor: '#D9E0F2' }}>
          <header className="flex justify-between items-center mb-6">
            <h1 className="text-black text-2xl">Gerenciamento de Turmas</h1>
            <button onClick={openAddModal} className="bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-300">
              + ADICIONAR
            </button>
          </header>

          <div className="overflow-x-auto">
  <table className="w-full table-auto bg-white rounded-lg">
    <thead className="bg-blue-800 text-white">
              <tr>
                <th className="p-4 text-left">Nome da Turma</th>
                <th className="p-4 text-left">Professor</th>
                <th className="p-4 text-left">Período</th>
                <th className="p-4 text-left">Nº de Alunos</th>
                <th className="p-4 text-left">Ações</th>
              </tr>
            </thead>
            <tbody>
              {turmas.map((turma, index) => (
                <tr
                  key={index}
                  className={`cursor-pointer ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}
                >
                       <td className="p-4">{turma.nome}</td>
      <td className="p-4">{turma.nomeProfessor}</td> 
      <td className="p-4">{turma.periodo}</td>
      <td className="p-4">{turma.numerodealunos}</td> 
      <td className="p-4">

                    <button onClick={() => openUpdateModal(turma)} className="bg-green-400 text-white px-2 py-1 rounded hover:bg-green-300 mr-2">
                      Editar
                    </button>
                    <button onClick={() => openDeleteModal(turma)} className="bg-red-400 text-white px-2 py-1 rounded hover:bg-red-300">
                      Remover
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
          {/* Modal Adicionar */}
      {isAddModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-5 rounded shadow-lg">
            <h2 className="text-xl mb-4">Adicionar Turma</h2>
            <form onSubmit={handleAddTurma}>
              <div className="mb-4">
                <label className="block mb-1">Nome da Turma</label>
                <input
                  type="text"
                  name="nome"
                  value={newTurma.nome}
                  onChange={handleInputChange}
                  className="border p-2 w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Professor</label>
                <input
                  type="text"
                  name="professor"
                  value={newTurma.nomeProfessor}
                  onChange={handleInputChange}
                  className="border p-2 w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Período</label>
                <input
                  type="text"
                  name="periodo"
                  value={newTurma.periodo}
                  onChange={handleInputChange}
                  className="border p-2 w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Número de Alunos</label>
                <input
                  type="number"
                  name="numerodealunos"
                  value={newTurma.numerodealunos}
                  onChange={handleInputChange}
                  className="border p-2 w-full"
                  required
                />
              </div>
                  <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-400">Adicionar</button>
                  <button type="button" onClick={closeAddModal} className="ml-2 bg-red-500 text-white px-4 py-2 rounded">Cancelar</button>
                </form>
              </div>
            </div>
          )}

           {/* Modal Atualizar */}
      {isUpdateModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-5 rounded shadow-lg">
            <h2 className="text-xl mb-4">Atualizar Turma</h2>
            <form onSubmit={handleUpdateTurma}>
              <div className="mb-4">
                <label className="block mb-1">Nome da Turma</label>
                <input
                  type="text"
                  name="nome"
                  value={newTurma.nome}
                  onChange={handleInputChange}
                  className="border p-2 w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Professor</label>
                <input
                  type="text"
                  name="professor"
                  value={newTurma.nomeProfessor}
                  onChange={handleInputChange}
                  className="border p-2 w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Período</label>
                <input
                  type="text"
                  name="periodo"
                  value={newTurma.periodo}
                  onChange={handleInputChange}
                  className="border p-2 w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Número de Alunos</label>
                <input
                  type="number"
                  name="numerodealunos"
                  value={newTurma.numerodealunos}
                  onChange={handleInputChange}
                  className="border p-2 w-full"
                  required
                />
              </div>
                  <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Salvar</button>
                  <button type="button" onClick={closeUpdateModal} className="ml-2 bg-red-500 text-white px-4 py-2 ">Cancelar</button>
                </form>
              </div>
            </div>
          )}

          {/* Modal de Remover Turma */}
          {isDeleteModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-8 rounded-lg">
                <h2 className="text-2xl mb-4">Remover Turma</h2>
                <p>Tem certeza que deseja remover a turma <strong>{selectedTurma?.nome}</strong>?</p>
                <div className="mt-4">
                  <button onClick={handleDeleteTurma} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-400">Remover</button>
                  <button onClick={closeDeleteModal} className="ml-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-400">Cancelar</button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Turmas;
