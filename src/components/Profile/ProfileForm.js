import './ProfileForm.css';

const ProfileForm = () => {
  return (
    <form className='form'>
      <div className='control'>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' />
      </div>
      <div className='action'>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
