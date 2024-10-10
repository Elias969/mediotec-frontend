import React, { useState, useEffect } from 'react';

const Index = () => {
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [newTeacher, setNewTeacher] = useState({
    nome: '',
    dataNasc: '',
    telefone: '',
    email: '',
    matricula: '',
    status: 'Ativo',
    disciplinas: '',
    endereco: ''
  });

  const [teachers, setTeachers] = useState([]);

  // Função para carregar professores da API
  const fetchTeachers = async () => {
    try {
      const response = await fetch('https://mediotec-backend.onrender.com/api/professores');
      if (!response.ok) {
        throw new Error('Erro na resposta da API');
      }
      const data = await response.json();
      if (data.length > 0) {
        setTeachers(data);
      }
    } catch (error) {
      console.error('Erro ao carregar os professores:', error);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const openTeacherModal = (teacher) => {
    setSelectedTeacher(teacher);
    setIsModalOpen(true);
  };

  const closeTeacherModal = () => {
    setSelectedTeacher(null);
    setIsModalOpen(false);
  };

  const openAddModal = () => {
    setNewTeacher({
      nome: '',
      dataNasc: '',
      telefone: '',
      email: '',
      matricula: '',
      status: 'Ativo',
      disciplinas: '',
      endereco: ''
    });
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };

  const openEditModal = (teacher) => {
    setSelectedTeacher(teacher);
    setNewTeacher(teacher);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTeacher((prevTeacher) => ({
      ...prevTeacher,
      [name]: value
    }));
  };

  const handleAddTeacher = async () => {
    try {
      const response = await fetch('https://mediotec-backend.onrender.com/api/professores', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTeacher)
      });

      if (!response.ok) {
        throw new Error('Erro ao adicionar professor');
      }

      const addedTeacher = await response.json();
      setTeachers((prevTeachers) => [...prevTeachers, addedTeacher]);
      closeAddModal();
    } catch (error) {
      console.error('Erro ao adicionar professor:', error);
    }
  };

  const handleEditTeacher = async () => {
    try {
      const response = await fetch(`https://mediotec-backend.onrender.com/api/professores/${selectedTeacher.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTeacher)
      });

      if (!response.ok) {
        throw new Error('Erro ao editar professor');
      }

      const updatedTeacher = await response.json();
      setTeachers((prevTeachers) =>
        prevTeachers.map((teacher) =>
          teacher.id === updatedTeacher.id ? updatedTeacher : teacher
        )
      );
      closeEditModal();
    } catch (error) {
      console.error('Erro ao editar professor:', error);
    }
  };

  const handleRemoveTeacher = async (teacherId) => {
    try {
      const response = await fetch(`https://mediotec-backend.onrender.com/api/professores/${teacherId}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Erro ao remover professor');
      }

      setTeachers((prevTeachers) =>
        prevTeachers.filter((teacher) => teacher.id !== teacherId)
      );
    } catch (error) {
      console.error('Erro ao remover professor:', error);
    }
  };

  return (
    <div className="w-full h-screen flex bg-gray-900">
      <div className="flex w-full h-full bg-white rounded-lg overflow-hidden">
        {/* Barra lateral */}
        <nav className="w-64 p-5" style={{ backgroundColor: '#201AE8' }}>
          <div className="w-64 text-white">
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
            <h1 className="text-black text-2xl">Gerenciamento de Professores</h1>
            <button onClick={openAddModal} className="bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-300">
              + ADICIONAR
            </button>
          </header>

          <div className="overflow-x-auto">
  <table className="w-full table-auto bg-white rounded-lg">
    <thead className="bg-blue-800 text-white">
              <tr>
                <th className="p-4 text-left">Nome</th>
                <th className="p-4 text-left">Data Nasc</th>
                <th className="p-4 text-left">Matrícula</th>
                <th className="p-4 text-left">Telefone</th>
                <th className="p-4 text-left">Ações</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map((teacher, index) => (
                <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`} onClick={() => openTeacherModal(teacher)}>
                  <td className="p-4 cursor-pointer">{teacher.nome}</td>
                  <td className="p-4">{teacher.dataNasc}</td>
                  <td className="p-4">{teacher.matricula}</td>
                  <td className="p-4">{teacher.telefone}</td>
                  <td className="p-4 flex space-x-2">
                    <button
                      onClick={(e) => { e.stopPropagation(); openEditModal(teacher); }}
                      className="bg-green-400 text-white px-2 py-1 rounded hover:bg-green-300"
                    >
                      Editar
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); handleRemoveTeacher(teacher.id); }}
                      className="bg-red-400 text-white px-2 py-1 rounded hover:bg-red-300"
                    >
                      Remover
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
</div>
           {/* Modal de Adição */}
{isAddModalOpen && (
  <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
    <div className="bg-white p-8 rounded-lg max-w-4xl w-full">
      <h2 className="text-xl mb-4">Adicionar Professor</h2>
      <form onSubmit={(e) => { e.preventDefault(); handleAddTeacher(); }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="mb-4">
            <label className="block">Nome</label>
            <input
              type="text"
              name="nome"
              value={newTeacher.nome}
              onChange={handleInputChange}
              className="border p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block">Data de Nascimento</label>
            <input
              type="date"
              name="dataNasc"
              value={newTeacher.dataNasc}
              onChange={handleInputChange}
              className="border p-2 w-full"
            />
          </div>
      
          <div className="mb-4">
            <label className="block">Telefone</label>
            <input
              type="tel"
              name="telefone"
              value={newTeacher.telefone}
              onChange={handleInputChange}
              className="border p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block">Email</label>
            <input
              type="email"
              name="email"
              value={newTeacher.email}
              onChange={handleInputChange}
              className="border p-2 w-full"
            />
          </div>
           <div className="mb-4">
                    <label className="block">Matrícula</label>
                    <input
                      type="text"
                      name="matricula"
                      value={newTeacher.matricula}
                      onChange={handleInputChange}
                      className="border p-2 w-full"
                    />
                  </div>
          <div className="mb-4">
                    <label className="block">Disciplinas</label>
                    <input
                      type="text"
                      name="disciplina"
                      value={newTeacher.disciplina}
                      onChange={handleInputChange}
                      className="border p-2 w-full"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block">Endereço</label>
                    <input
                      type="text"
                      name="endereco"
                      value={newTeacher.endereco}
                      onChange={handleInputChange}
                      className="border p-2 w-full"
                    />
                  </div>
        </div>
        <div className="flex justify-end mt-4">
          
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Adicionar
          </button>

          <button onClick={closeAddModal} className="ml-2 bg-red-500 text-white px-4 py-2 rounded">
            Cancelar
          </button>
        </div>
      </form>
    </div>
  </div>
)}



         
          {/* Modal de Edição */}
          {isEditModalOpen && (
             <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <div className="bg-white p-8 rounded-lg w-96">
                <h2 className="text-xl font-bold mb-4">Editar Professor</h2>
                <form onSubmit={(e) => { e.preventDefault(); handleEditTeacher(); }}>
              
                  <input type="text" name="nome" placeholder="Nome" value={newTeacher.nome} onChange={handleInputChange} required className="border p-2 mb-4 w-full" />
                  <input type="date" name="dataNasc" placeholder="Data de Nascimento" value={newTeacher.dataNasc} onChange={handleInputChange} required className="border p-2 mb-4 w-full" />
                  <input type="text" name="telefone" placeholder="Telefone" value={newTeacher.telefone} onChange={handleInputChange} required className="border p-2 mb-4 w-full" />
                  <input type="email" name="email" placeholder="E-mail" value={newTeacher.email} onChange={handleInputChange} required className="border p-2 mb-4 w-full" />
                  <input type="text" name="matricula" placeholder="Matrícula" value={newTeacher.matricula} onChange={handleInputChange} required className="border p-2 mb-4 w-full" />
                   <input type="email" name="email" placeholder="E-mail" value={newTeacher.email} onChange={handleInputChange} required className="border p-2 mb-4 w-full" />
                  <select name="status" value={newTeacher.status} onChange={handleInputChange} className="border p-2 mb-4 w-full">
                    <option value="Ativo">Ativo</option>
                    <option value="Inativo">Inativo</option>
                  </select>
                  <input type="text" name="disciplina" placeholder="Disciplinas" value={newTeacher.disciplina} onChange={handleInputChange} className="border p-2 mb-4 w-full" />
                  <input type="text" name="endereco" placeholder="Endereço" value={newTeacher.endereco} onChange={handleInputChange} className="border p-2 mb-4 w-full" />
                  <div className="flex justify-end">
                  <button type="submit" className=" text-white px-4 py-2 rounded bg-blue-500">Salvar</button>
                  <button onClick={closeEditModal} className="text-white px-4 py-2 rounded bg-red-500 ml-2">Fechar</button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Modal de Informação do Professor */}
          {isModalOpen && selectedTeacher && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
              <div className="bg-white p-8 rounded-lg max-w-4xl w-full">
                <h2 className="text-xl font-bold mb-4">Informações do Professor</h2>
                <p><strong>Nome:</strong> {selectedTeacher.nome}</p>
                <p><strong>Data de Nascimento:</strong> {selectedTeacher.dataNasc}</p>
                <p><strong>Telefone:</strong> {selectedTeacher.telefone}</p>
                <p><strong>E-mail:</strong> {selectedTeacher.email}</p>
                <p><strong>Matrícula:</strong> {selectedTeacher.matricula}</p>
                <p><strong>Status:</strong> {selectedTeacher.status}</p>
                <p><strong>Disciplinas:</strong> {selectedTeacher.disciplina}</p>
                <p><strong>Endereço:</strong> {selectedTeacher.endereco}</p>
                <div className="flex justify-end">
                  <button onClick={closeTeacherModal} className="bg-gray-400 text-white px-4 py-2 rounded">Fechar</button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Index;
