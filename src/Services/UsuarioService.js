import http from '../common/http-common';
const API_URL = "/usuarios/";

const findAll = () => {
    return http.mainInstance.get(API_URL + 'all');
};

const findById = (id) => {
    return http.mainInstance.get(API_URL + `${id}`);
};

const signup = (nome, email, password) => {
    return http.mainInstance.post(API_URL + "signup", {
        nome,
        email,
        password,
    });
};

const signin = async (identifier, senha) => {
    const payload = new URLSearchParams();
    payload.append('username', identifier);
    payload.append('password', senha);

    const response = await http.mainInstance.post('/login', payload.toString(), {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        withCredentials: true,
        validateStatus: status => status < 500,
    });

    if (response.status === 200) {
        const userRes = await http.mainInstance.get(API_URL + 'me', {
            withCredentials: true,
        });
        const user = userRes.data;
        localStorage.setItem('user', JSON.stringify(user));
        return user;
    }

    return null;
};

const logout = async () => {
    localStorage.removeItem('user');
    try {
        await http.mainInstance.post('/logout', null, {
            withCredentials: true,
            validateStatus: status => status < 500,
        });
    } catch (err) {
        // ignore logout network failure
    }
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));
};

const me = () => {
    return http.mainInstance.get(API_URL + 'me', {
        withCredentials: true,
    });
};


/*const create = data => {
    const formData = new FormData();
    formData.append('nome', data.nome);
    formData.append('email', data.email);
    formData.append('nivelAcesso', data.nivelAcesso);
    formData.append('senha', data.senha);
    formData.append('dataNascimento', data.dataNascimento);

    return http.mainInstance.post(API_URL + "cadastrar", formData);
};
*/

const cadastrar = (data) => {
    // Observação: endpoint de create atualmente usa @RequestBody Usuario (JSON), não multipart.
    // Então, a foto só pode ser enviada se você ajustar o backend.
    return http.mainInstance.post(API_URL + "create", {
        nome: data.nome,
        username: data.email,
        password: data.senha,
        nivelAcesso: data.nivelAcesso,
    });
};


const update = (id, data) => {
    // Usa o endpoint do backend:
    // PUT /usuarios/{id}
    // com multipart: RequestPart(file) + RequestPart(usuario)
    // Aqui `data` já é um FormData montado no frontend.
    return http.multipartInstance.put(API_URL + `${id}`, data);
};


const inativar = (id) => {
    return http.mainInstance.put(API_URL + `${id}/inativar`);
};

const reativar = (id) => {
    return http.mainInstance.put(API_URL + `${id}/ativar`);
};



const alterarSenha = (id, data) => {
    return http.mainInstance.put(API_URL + `${id}/alterar-senha`, null, {
        params: { newPassword: data.senha },
    });
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
    me,
    /*create,*/
    update,
    inativar,
    reativar,
    alterarSenha,
    findByNome,
}

export default UsuarioService;
