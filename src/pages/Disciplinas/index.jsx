import React, { useState, useEffect } from 'react';

const Disciplina = () => {
  const [selectedDisciplina, setSelectedDisciplina] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newDisciplina, setNewDisciplina] = useState({
    nome: '',
    codigo: '',
    professor: '',
    horario: '',
    status: 'Ativo',
  });

  // Estado inicial para as disciplinas
  const [disciplinas, setDisciplinas] = useState([]);

  // Função para carregar disciplinas da API
  const fetchDisciplinas = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/disciplinas'); // Use a rota correta
      if (!response.ok) {
        throw new Error('Erro na resposta da API');
      }
      const data = await response.json();
      setDisciplinas(data);
    } catch (error) {
      console.error('Erro ao carregar as disciplinas:', error);
    }
  };

  // Carrega as disciplinas quando o componente é montado
  useEffect(() => {
    fetchDisciplinas();
  }, []);

  const openModal = (disciplina) => {
    setSelectedDisciplina(disciplina);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedDisciplina(null);
    setIsModalOpen(false);
  };

  const openAddModal = () => {
    setNewDisciplina({
      nome: '',
      codigo: '',
      professor: '',
      horario: '',
      status: 'Ativo',
    });
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDisciplina((prevDisciplina) => ({
      ...prevDisciplina,
      [name]: value
    }));
  };

  const handleAddDisciplina = async (e) => {
    e.preventDefault();

    console.log('Dados da disciplina:', newDisciplina);

    try {
      const response = await fetch('http://localhost:8080/api/disciplinas', { // Use a rota correta
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newDisciplina),
      });

      if (response.ok) {
        await fetchDisciplinas(); // Atualiza a lista de disciplinas
        closeAddModal();
      } else {
        console.error('Erro ao adicionar disciplina');
      }
    } catch (error) {
      console.error('Erro ao adicionar disciplina:', error);
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
            <h1 className="text-black text-2xl">Gerenciamento de Disciplinas</h1>
            <button onClick={openAddModal} className="bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-300">
              + ADICIONAR
            </button>
          </header>

          <table className="w-full table-auto bg-white rounded-lg overflow-hidden">
            <thead className="bg-blue-800 text-white">
              <tr>
                <th className="p-4 text-left">Nome</th>
                <th className="p-4 text-left">Código</th>
                <th className="p-4 text-left">Professor</th>
                <th className="p-4 text-left">Horário</th>
              </tr>
            </thead>
            <tbody>
              {disciplinas.map((disciplina, index) => (
                <tr
                  key={index}
                  className={`cursor-pointer ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}
                  onClick={() => openModal(disciplina)}
                >
                  <td className="p-4">{disciplina.nome}</td>
                  <td className="p-4">{disciplina.codigo}</td>
                  <td className="p-4">{disciplina.professor}</td>
                  <td className="p-4">{disciplina.horario}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Modal */}
          {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
              <div className="bg-white p-8 rounded-lg w-96 relative">
                <button onClick={closeModal} className="absolute top-4 right-4 text-xl font-bold">&times;</button>
                <h2 className="text-2xl mb-4">{selectedDisciplina.nome}</h2>
                <p><strong>Código:</strong> {selectedDisciplina.codigo}</p>
                <p><strong>Professor:</strong> {selectedDisciplina.professor}</p>
                <p><strong>Horário:</strong> {selectedDisciplina.horario}</p>
                <p><strong>Status:</strong> {selectedDisciplina.status}</p>
              </div>
            </div>
          )}

          {/* Modal de adição de disciplina */}
          {isAddModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
              <div className="bg-white p-4 rounded-lg w-full max-w-md max-h-screen overflow-y-auto relative">
                <button onClick={closeAddModal} className="absolute top-4 right-4 text-xl font-bold">&times;</button>
                <h2 className="text-2xl mb-4">Adicionar Disciplina</h2>
                <form onSubmit={handleAddDisciplina} className="space-y-4">
                  {['nome', 'codigo', 'professor', 'horario'].map((field) => (
                    <div key={field} className="flex flex-col">
                      <label className="block text-gray-700 capitalize">{field}</label>
                      <input
                        type="text"
                        name={field}
                        value={newDisciplina[field]}
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
                      value={newDisciplina.status}
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
                    Adicionar Disciplina
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

export default Disciplina;