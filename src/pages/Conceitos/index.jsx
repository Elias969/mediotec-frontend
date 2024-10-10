import React, { useState, useEffect } from 'react';

const Conceitos = () => {
  const [selectedAluno, setSelectedAluno] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newConceito, setNewConceito] = useState({
    aluno: '',
    disciplina: '',
    conceito: '',
    semestre: '',
  });

  // Estado inicial para os conceitos
  const [conceitos, setConceitos] = useState([]);

  // Função para carregar conceitos da API
  const fetchConceitos = async () => {
    try {
      const response = await fetch('https://mediotec-backend.onrender.com/api/conceitos'); // Rota correta da API
      if (!response.ok) {
        throw new Error('Erro na resposta da API');
      }
      const data = await response.json();
      setConceitos(data);
    } catch (error) {
      console.error('Erro ao carregar os conceitos:', error);
    }
  };

  // Carrega os conceitos quando o componente é montado
  useEffect(() => {
    fetchConceitos();
  }, []);

  const openModal = (aluno) => {
    setSelectedAluno(aluno);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedAluno(null);
    setIsModalOpen(false);
  };

  const openAddModal = () => {
    setNewConceito({
      aluno: '',
      disciplina: '',
      conceito: '',
      semestre: ''
    });
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewConceito((prevConceito) => ({
      ...prevConceito,
      [name]: value
    }));
  };

  const handleAddConceito = async (e) => {
    e.preventDefault();

    console.log('Dados do conceito:', newConceito);

    try {
      const response = await fetch('https://mediotec-backend.onrender.com/api/conceitos', { // Rota correta da API
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newConceito),
      });

      if (response.ok) {
        await fetchConceitos(); // Atualiza a lista de conceitos
        closeAddModal();
      } else {
        console.error('Erro ao adicionar conceito');
      }
    } catch (error) {
      console.error('Erro ao adicionar conceito:', error);
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
          
            <li><a href="https://mediotec.netlify.app/Principal" className="text-white hover:bg-white hover:text-black px-4 py-2 block rounded"> Alunos</a></li>
            <li><a href="https://mediotec.netlify.app/Turmas" className="text-white hover:bg-white hover:text-black px-4 py-2 block rounded"> Turmas</a></li>
            <li><a href="https://mediotec.netlify.app/Conceitos" className="text-white hover:bg-white hover:text-black px-4 py-2 block rounded">Conceitos</a></li>
            <li><a href="https://mediotec.netlify.app/Disciplinas" className="text-white hover:bg-white hover:text-black px-4 py-2 block rounded"> Disciplinas</a></li>
            <li><a href="https://mediotec.netlify.app/Comunicados" className="text-white hover:bg-white hover:text-black px-4 py-2 block rounded"> Comunicados</a></li>
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
            <h1 className="text-black text-2xl">Gerenciamento de Conceitos</h1>
            <button onClick={openAddModal} className="bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-300">
              + ADICIONAR
            </button>
          </header>

          <div className="overflow-x-auto">
  <table className="w-full table-auto bg-white rounded-lg">
    <thead className="bg-blue-800 text-white">
              <tr>
                <th className="p-4 text-left">Aluno</th>
                <th className="p-4 text-left">Disciplina</th>
                <th className="p-4 text-left">Conceito</th>
                <th className="p-4 text-left">Semestre</th>
              </tr>
            </thead>
            <tbody>
              {conceitos.map((conceito, index) => (
                <tr
                  key={index}
                  className={`cursor-pointer ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}
                  onClick={() => openModal(conceito)}
                >
                  <td className="p-4">{conceito.aluno}</td>
                  <td className="p-4">{conceito.disciplina}</td>
                  <td className="p-4">{conceito.conceito}</td>
                  <td className="p-4">{conceito.semestre}</td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
          {/* Modal de informações do conceito */}
          {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
              <div className="bg-white p-8 rounded-lg w-96 relative">
                <button onClick={closeModal} className="absolute top-4 right-4 text-xl font-bold">&times;</button>
                <h2 className="text-2xl mb-4">{selectedAluno.aluno}</h2>
                <p><strong>Disciplina:</strong> {selectedAluno.disciplina}</p>
                <p><strong>Conceito:</strong> {selectedAluno.conceito}</p>
                <p><strong>Semestre:</strong> {selectedAluno.semestre}</p>
              </div>
            </div>
          )}

          {/* Modal de adição de conceito */}
          {isAddModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
              <div className="bg-white p-4 rounded-lg w-full max-w-md max-h-screen overflow-y-auto relative">
                <button onClick={closeAddModal} className="absolute top-4 right-4 text-xl font-bold">&times;</button>
                <h2 className="text-2xl mb-4">Adicionar Conceito</h2>
                <form onSubmit={handleAddConceito} className="space-y-4">
                  {/* Campos do formulário */}
                  {['aluno', 'disciplina', 'conceito', 'semestre'].map((field) => (
                    <div key={field} className="flex flex-col">
                      <label className="block text-gray-700 capitalize">{field}</label>
                      <input
                        type="text"
                        name={field}
                        value={newConceito[field]}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                  ))}
                  <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-400">
                    Adicionar
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

export default Conceitos;
