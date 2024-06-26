import { Link } from 'react-router-dom';
import { StyledRegisterTemplate } from './register.styled';
import { UserServices } from '../../services';
import { Title, SubTitle, Form } from '../../components';
import { ToastifyAdapter } from '../helpers/toast';
import { useNavigate } from 'react-router-dom';
import { RegisterProps } from '../types';

export const RegisterTemplate = () => {
  const navigate = useNavigate();

  const handleRegister = async ({ email, password }: RegisterProps) => {
    const response = await UserServices.register(email, password);

    if (typeof response === 'string') {
      ToastifyAdapter.toast(`Usuário registrado com sucesso! `, {
        position: 'top-right',
        autoClose: 3000,
        pauseOnHover: true,
        theme: 'dark',
        type: 'success',
      });

      navigate('/login');
    } else {
      ToastifyAdapter.toast(`${response['message']}`, {
        position: 'top-right',
        autoClose: 3000,
        pauseOnHover: true,
        theme: 'dark',
        type: 'error',
      });
    }
  };

  const registerFields = [
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'password', label: 'Password', type: 'password' },
  ];

  return (
    <>
      <StyledRegisterTemplate>
        <Title />
        <SubTitle subtitle={'Register'} />
        <Form
          fields={registerFields}
          onSubmit={handleRegister}
          buttonName='Registrar'
        />
        <span>
          Já tem uma conta?{' '}
          <Link to='/login' className='link'>
            Entrar
          </Link>
        </span>
      </StyledRegisterTemplate>
      {ToastifyAdapter.toastContainer()}
    </>
  );
};
