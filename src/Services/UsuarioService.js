import http from '../common/http-common';
const API_URL = "/api/v1/usuario";

const findAll = () => {
    return http.mainInstance.get(API_URL + 'listar');
};

const findById = (id) => {
    return http.mainInstance.get(API_URL + `buscar/${id}`);
};

const signup = (nome, email, password) => {
    return http.mainInstance.post(API_URL + "signup", {
        nome,
        email,
        password,
    });
};

const signin = async (email, senha) => {
    const response = await http.mainInstance
        .post(API_URL + "login", {
            email,
            senha,
        });
    if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
};

const logout = () => {
    localStorage.removeItem("user");
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
};


const create = data => {
    const formData = new FormData();
    formData.append('nome', data.nome);
    formData.append('email', data.email);
    formData.append('nivelAcesso', data.nivelAcesso);
    formData.append('senha', data.senha);
    formData.append('dataNascimento', data.dataNascimento);

    return http.mainInstance.post(API_URL + "/cadastrar", formData);
};

const update = (id, data) => {
    return http.multipartInstance.put(API_URL + `/atualizar/${id}`, data);
};

const inativar = (id) => {
    return http.multipartInstance.put(API_URL + `/inativar/${id}`);
};

const reativar = (id) => {
    return http.multipartInstance.put(API_URL + `/reativar/${id}`);
};

const cadastrar = () => {
    return http.multipartInstance.post(API_URL + `cadastrar`);
};

const alterarSenha = (id, data) => {
    const formData = new FormData();
    formData.append('senha', data.senha);
 
    return http.mainInstance.put(API_URL + `alterarSenha/${id}`, formData);
};

const findByNome = nome => {
    return http.mainInstance.get(API_URL + `findByNome?nome=${nome}`);
};


const UsuarioService = {
    cadastrar,
    findAll,
    findById,
    signup,
    signin,
    logout,
    getCurrentUser,
    create,
    update,
    inativar,
    reativar,
    alterarSenha,
    findByNome,
}

export default UsuarioService;