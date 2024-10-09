import React, { useState, useEffect } from 'react';

const Index = () => {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [newStudent, setNewStudent] = useState({
    nome: '',
    dataNasc: '',
    telefone: '',
    turma: '',
    email: '',
    matricula: '',
    status: 'Ativo',
    endereco: '',
    disciplinas: []
  });

  const [students, setStudents] = useState([]);

  // Função para carregar alunos da API
  const fetchStudents = async () => {
    try {
      const response = await fetch('https://mediotec-backend.onrender.com/api/alunos');
      if (!response.ok) {
        throw new Error('Erro na resposta da API');
      }
      const data = await response.json();
      if (data.length > 0) {
        setStudents(data);
      }
    } catch (error) {
      console.error('Erro ao carregar os alunos:', error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const openStudentModal = (student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  const closeStudentModal = () => {
    setSelectedStudent(null);
    setIsModalOpen(false);
  };

  const openAddModal = () => {
    setNewStudent({
      nome: '',
      dataNasc: '',
      telefone: '',
      turma: '',
      email: '',
      matricula: '',
      status: 'Ativo',
      endereco: '',
      disciplinas: []
    });
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };

  const openEditModal = (student) => {
    setSelectedStudent(student);
    setNewStudent(student);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value, checked } = e.target;

    if (name === "disciplinas") {
      let updatedDisciplinas = [...newStudent.disciplinas];

      if (checked) {
        // Adicionar a disciplina ao array se estiver marcada
        updatedDisciplinas.push(parseInt(value)); // Converta para int
      } else {
        // Remover a disciplina do array se desmarcada
        updatedDisciplinas = updatedDisciplinas.filter(
          (disciplina) => disciplina !== parseInt(value) // Converta para int
        );
      }

      setNewStudent({ ...newStudent, disciplinas: updatedDisciplinas });
    } else {
      setNewStudent({ ...newStudent, [name]: value });
    }
  };

  const handleAddStudent = async () => {
    // Transforme as disciplinas para o formato esperado pelo backend
    const formattedDisciplines = newStudent.disciplinas.map(id => ({ id }));

    const studentToAdd = {
      ...newStudent,
      disciplinas: formattedDisciplines // Use o novo formato aqui
    };

    console.log('Dados do novo aluno:', studentToAdd); // Verifique os dados antes de enviar
    try {
      const response = await fetch('https://mediotec-backend.onrender.com/api/alunos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(studentToAdd) // Envie o novo objeto formatado
      });

      if (!response.ok) {
        throw new Error('Erro ao adicionar aluno');
      }

      const addedStudent = await response.json();
      setStudents((prevStudents) => [...prevStudents, addedStudent]);
      closeAddModal();
    } catch (error) {
      console.error('Erro ao adicionar aluno:', error);
    }
  };

  const handleEditStudent = async () => {
    try {
      const response = await fetch(`https://mediotec-backend.onrender.com/api/alunos/${selectedStudent.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newStudent)
      });

      if (!response.ok) {
        throw new Error('Erro ao editar aluno');
      }

      const updatedStudent = await response.json();
      setStudents((prevStudents) =>
        prevStudents.map((student) =>
          student.id === updatedStudent.id ? updatedStudent : student
        )
      );
      closeEditModal();
    } catch (error) {
      console.error('Erro ao editar aluno:', error);
    }
  };

  const handleRemoveStudent = async (studentId) => {
    try {
      const response = await fetch(`https://mediotec-backend.onrender.com/api/alunos/${studentId}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Erro ao remover aluno');
      }

      setStudents((prevStudents) =>
        prevStudents.filter((student) => student.id !== studentId)
      );
    } catch (error) {
      console.error('Erro ao remover aluno:', error);
    }
  };

  const fetchSubjects = async () => {
    try {
      const response = await fetch('https://mediotec-backend.onrender.com/api/disciplinas'); // URL da sua API de disciplinas
      if (!response.ok) {
        throw new Error('Erro na resposta da API');
      }
      const data = await response.json();
      setSubjects(data);
    } catch (error) {
      console.error('Erro ao carregar as disciplinas:', error);
    }
  };

  const fetchClasses = async () => {
    try {
      const response = await fetch('https://mediotec-backend.onrender.com/api/turmas'); // URL da sua API de turmas
      if (!response.ok) {
        throw new Error('Erro na resposta da API');
      }
      const data = await response.json();
      setClasses(data);
    } catch (error) {
      console.error('Erro ao carregar as turmas:', error);
    }
  };

  useEffect(() => {
    fetchStudents();
    fetchSubjects();
    fetchClasses(); // Chama a função para carregar turmas
  }, []);

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
      
      
      <li>
        <a
          href="https://mediotec.netlify.app/Principal"
          className="text-white hover:bg-white hover:text-black px-4 py-2 block rounded transition duration-300 ease-in-out"
        >
          Alunos
        </a>
      </li>
      <li>
        <a
          href="https://mediotec.netlify.app/Turmas"
          className="text-white hover:bg-white hover:text-black px-4 py-2 block rounded transition duration-300 ease-in-out"
        >
          Turmas
        </a>
      </li>
      <li>
        <a
          href="https://mediotec.netlify.app/Conceitos"
          className="text-white hover:bg-white hover:text-black px-4 py-2 block rounded transition duration-300 ease-in-out"
        >
          Conceitos
        </a>
      </li>
      <li>
        <a
          href="https://mediotec.netlify.app/Disciplinas"
          className="text-white hover:bg-white hover:text-black px-4 py-2 block rounded transition duration-300 ease-in-out"
        >
          Disciplinas
        </a>
      </li>
      <li>
        <a
          href="https://mediotec.netlify.app/Comunicados"
          className="text-white hover:bg-white hover:text-black px-4 py-2 block rounded transition duration-300 ease-in-out"
        >
          Comunicados
        </a>
      </li>
      <li>
        <a
          href="https://mediotec.netlify.app"
          className="text-white hover:bg-white hover:text-black px-4 py-2 block rounded transition duration-300 ease-in-out"
        >
          Sair
        </a>
      </li>
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
              <h1 className="text-black text-2xl">Gerenciamento de Alunos</h1>
              <button onClick={openAddModal} className="bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-300">
                + ADICIONAR
              </button>
            </header>

            <table className="w-full table-auto bg-white rounded-lg overflow-hidden">
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
                {students.map((student, index) => (
                  <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`} onClick={() => openStudentModal(student)}>
                    <td className="p-4 cursor-pointer">{student.nome}</td>
                    <td className="p-4">{student.dataNasc}</td>
                    <td className="p-4">{student.matricula}</td>
                    <td className="p-4">{student.telefone}</td>
                    <td className="p-4 flex space-x-2">
                      <button
                        onClick={(e) => { e.stopPropagation(); openEditModal(student); }}
                        className="bg-green-400 text-white px-2 py-1 rounded hover:bg-green-300"
                      >
                        Editar
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleRemoveStudent(student.id); }}
                        className="bg-red-400 text-white px-2 py-1 rounded hover:bg-red-300"
                      >
                        Remover
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            
            {/* Modal de Adição */}
            {isAddModalOpen && (
              <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                <div className="bg-white p-8 rounded-lg max-w-4xl w-full">
                  <h2 className="text-xl mb-4">Adicionar Aluno</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="mb-4">
                      <label className="block">Nome</label>
                      <input
                        type="text"
                        name="nome"
                        value={newStudent.nome}
                        onChange={handleInputChange}
                        className="border p-2 w-full"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block">Data de Nascimento</label>
                      <input
                        type="date"
                        name="dataNasc"
                        value={newStudent.dataNasc}
                        onChange={handleInputChange}
                        className="border p-2 w-full"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block">Telefone</label>
                      <input
                        type="tel"
                        name="telefone"
                        value={newStudent.telefone}
                        onChange={handleInputChange}
                        className="border p-2 w-full"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block">Turma</label>
                      <select
      name="turma"
      value={newStudent.turma}
      onChange={handleInputChange}
      className="border p-2 w-full"
    >
      <option value="">Selecione uma turma</option>
      {classes.map((classe) => (
        <option key={classe.id} value={classe.id}> 
          {classe.nome} 
        </option>
      ))}
    </select>
  </div>

                    <div className="mb-4">
                      <label className="block">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={newStudent.email}
                        onChange={handleInputChange}
                        className="border p-2 w-full"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block">Matrícula</label>
                      <input
                        type="text"
                        name="matricula"
                        value={newStudent.matricula}
                        onChange={handleInputChange}
                        className="border p-2 w-full"
                      />
                    </div>
                    <div className="mb-4">
  <label className="block">Disciplinas</label>
  <div className="grid grid-cols-2 gap-2">
    {subjects.map((subject) => (
      <div key={subject.id}>
        <label>
          <input
            type="checkbox"
            name="disciplinas"
            value={subject.id} // Isso deve ser o ID da disciplina
            checked={newStudent.disciplinas.includes(subject.id)}
            onChange={handleInputChange}
            className="mr-2"
          />
          {subject.nome}
        </label>
      </div>
    ))}
  </div>
</div>

                    
                    <div className="mb-4">
                      <label className="block">Endereço</label>
                      <input
                        type="text"
                        name="endereco"
                        value={newStudent.endereco}
                        onChange={handleInputChange}
                        className="border p-2 w-full"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end mt-4">
                    <button onClick={handleAddStudent} className="bg-blue-500 text-white px-4 py-2 rounded">
                      Adicionar
                    </button>
                    <button onClick={closeAddModal} className="ml-2 bg-red-500 text-white px-4 py-2 rounded">
                      Cancelar
                    </button>
                  </div>
                </div>
              </div>
            )}
            {isEditModalOpen && (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg w-96">
              <h2 className="text-xl mb-4">Editar Aluno</h2>
              <form onSubmit={(e) => { e.preventDefault(); handleEditStudent(); }}>
    <input type="text" name="nome" value={newStudent.nome} onChange={handleInputChange} placeholder="Nome" className="border p-2 w-full mb-2" required />
    <input type="date" name="dataNasc" value={newStudent.dataNasc} onChange={handleInputChange} className="border p-2 w-full mb-2" required />
    <input type="text" name="telefone" value={newStudent.telefone} onChange={handleInputChange} placeholder="Telefone" className="border p-2 w-full mb-2" required />
    <input type="text" name="turma" value={newStudent.turma} onChange={handleInputChange} placeholder="Turma" className="border p-2 w-full mb-2" required />
    <input type="email" name="email" value={newStudent.email} onChange={handleInputChange} placeholder="Email" className="border p-2 w-full mb-2" required />
    <input type="text" name="matricula" value={newStudent.matricula} onChange={handleInputChange} placeholder="Matrícula" className="border p-2 w-full mb-2" required />
    <select name="status" value={newStudent.status} onChange={handleInputChange} className="border p-2 w-full mb-2">
        <option value="Ativo">Ativo</option>
        <option value="Inativo">Inativo</option>
    </select>
  
    <textarea name="disciplinas" value={newStudent.disciplinas} onChange={handleInputChange} placeholder="Disciplina" className="border p-2 w-full mb-2" />
    <textarea name="endereco" value={newStudent.endereco} onChange={handleInputChange} placeholder="Endereço" className="border p-2 w-full mb-2" />
    <button type="submit" className="text-white px-4 py-2 rounded bg-blue-500">Salvar</button>
    <button onClick={closeEditModal} className="text-white px-4 py-2 rounded bg-red-500 ml-2">Fechar</button>
</form>

          </div>
      </div>
  )}
        
            {/* Modal de Informações do Aluno */}
            {isModalOpen && selectedStudent && (
  <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
    <div className="bg-white p-8 rounded shadow-lg">
      <h2 className="text-xl mb-4">Informações do Aluno</h2>
      <p><strong>Nome:</strong> {selectedStudent.nome}</p>
      <p><strong>Data de Nascimento:</strong> {selectedStudent.dataNasc}</p>
      <p><strong>Matrícula:</strong> {selectedStudent.matricula}</p>
      <p><strong>Telefone:</strong> {selectedStudent.telefone}</p>
      <p><strong>Email:</strong> {selectedStudent.email}</p>
      <p><strong>Endereço:</strong> {selectedStudent.endereco}</p>
      <p><strong>Disciplinas:</strong></p>
      <ul>
        {Array.isArray(selectedStudent.disciplinas) ? (
          selectedStudent.disciplinas.map((disciplina, index) => (
            <li key={index}>
              {disciplina.nome ? disciplina.nome : disciplina} {/* Se disciplina for um objeto */}
            </li>
          ))
        ) : (
          <p>{selectedStudent.disciplinas?.nome || selectedStudent.disciplinas}</p> // Caso não seja um array
        )}
      </ul>
      <button onClick={closeStudentModal} className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-300 mt-4">
        Fechar
      </button>
    </div>
  </div>
)}


          </main>
        </div>
      </div>
    );
  };

  export default Index;
