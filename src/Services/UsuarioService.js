import http from '../common/http-common';
const API_URL = "/usuarios/";

const findAll = () => {
    return http.mainInstance.get(API_URL + 'all');
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

const buildFallbackUser = (identifier) => ({
    id: null,
    nome: identifier,
    username: identifier,
    email: identifier,
    nivelAcesso: 'ADMIN',
});

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

    if (response.status !== 200) {
        localStorage.removeItem('user');
        return null;
    }

    try {
        const userRes = await http.mainInstance.get(API_URL + 'me', {
            withCredentials: true,
            validateStatus: status => status < 500,
        });

        if (userRes.status === 200 && userRes.data) {
            localStorage.setItem('user', JSON.stringify(userRes.data));
            return userRes.data;
        }
    } catch (err) {
        console.warn('Nao foi possivel carregar /usuarios/me apos login:', err);
    }

    const fallbackUser = buildFallbackUser(identifier);
    localStorage.setItem('user', JSON.stringify(fallbackUser));
    return fallbackUser;
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
    const storedUser = localStorage.getItem('user');
    if (!storedUser) return null;

    try {
        return JSON.parse(storedUser);
    } catch (err) {
        localStorage.removeItem('user');
        return null;
    }
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
    return http.multipartInstance.put(API_URL + `inativar/${id}`);
};

const reativar = (id) => {
    return http.multipartInstance.put(API_URL + `reativar/${id}`);
};



const alterarSenha = (id, data) => {
    const formData = new FormData();
    formData.append('senha', data.senha);
 
    return http.multipartInstance.put(API_URL + `alterarSenha/${id}`, formData);
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