import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Por favor, preencha todos os campos.');
    } else {
      // Verifica credenciais
      if (username === 'professor' && password === 'professor123') {
        setError(''); // Limpa erros
        navigate('/Principal'); // Redireciona para a página Principal
      } else if (username === 'coordenador' && password === 'coordenador123') {
        setError(''); // Limpa erros
        navigate('/Coordenadores'); // Redireciona para a página Coordenadores
      } else {
        setError('Usuário ou senha incorretos.'); // Mensagem de erro
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#201AE8] relative">
      
      <div className="flex flex-row items-center justify-center w-full max-w-4xl space-x-8 z-10">
        <img
          src="images/mediotec-mobile.png"
          alt="MEDIOTEC SENAC"
          className="w-1/3"
        />
        <div className="w-1/2">
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4 transition-transform transform hover:scale-105 duration-300"
          >
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                Usuário
              </label>
              <input
                className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-blue-400"
                id="username"
                type="text"
                placeholder="Usuário"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Senha
              </label>
              <input
                className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-blue-400"
                id="password"
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-[#630FFF] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
                type="submit"
              >
                Entrar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Index;
