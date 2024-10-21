import { Form } from '../lib/form';
import { login } from './action';

export default async function Page() {
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div style={{ width: '300px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
          <Form action={login}>
            <label htmlFor="username" style={{ fontFamily: 'Arial, sans-serif', fontSize: '14px', fontWeight: 'bold', color: '#333', display: 'block', marginBottom: '5px' }}>Username</label>
            <input 
              name="username" 
              id="username" 
              style={{ width: '100%', padding: '8px', marginBottom: '15px', border: '1px solid #ccc', borderRadius: '4px', fontFamily: 'Arial, sans-serif' }}
            />
            <label htmlFor="password" style={{ fontFamily: 'Arial, sans-serif', fontSize: '14px', fontWeight: 'bold', color: '#333', display: 'block', marginBottom: '5px' }}>Password</label>
            <input 
              type="password" 
              name="password" 
              id="password" 
              style={{ width: '100%', padding: '8px', marginBottom: '15px', border: '1px solid #ccc', borderRadius: '4px', fontFamily: 'Arial, sans-serif' }}
            />
            <button style={{ width: '100%', padding: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontFamily: 'Arial, sans-serif', fontSize: '16px' }}>Continue</button>
          </Form>
        </div>
      </div>
    </>
  );
}
