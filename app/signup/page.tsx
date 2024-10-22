import { signup } from './action';
import { Form } from '../lib/form';

export default async function Page() {
  return (
    <>
      <div style={{
        maxWidth: '400px',
        margin: '0 auto',
        padding: '20px',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        marginTop: '50px'
      }}>
        <h1 style={{
          textAlign: 'center',
          fontFamily: 'Arial, sans-serif',
          color: '#333'
        }}>
          Create an Account
        </h1>
        <Form action={signup} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label
              htmlFor="username"
              style={{
                fontWeight: 600,
                marginBottom: '5px',
                fontFamily: 'Arial, sans-serif',
                color: '#555'
              }}
            >
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Enter your username"
              required
              style={{
                padding: '10px',
                fontSize: '16px',
                border: '1px solid #ddd',
                borderRadius: '4px'
              }}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label
              htmlFor="password"
              style={{
                fontWeight: 600,
                marginBottom: '5px',
                fontFamily: 'Arial, sans-serif',
                color: '#555'
              }}
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              required
              style={{
                padding: '10px',
                fontSize: '16px',
                border: '1px solid #ddd',
                borderRadius: '4px'
              }}
            />
          </div>
          <button
            style={{
              padding: '10px',
              fontSize: '16px',
              backgroundColor: '#0056b3',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Continue
          </button>
        </Form>
      </div>
    </>
  );
}
