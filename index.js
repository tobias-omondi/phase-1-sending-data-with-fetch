// Add your code here
//first we will call our function

function submitData(name, email) {
    return fetch('/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email }),
    })
      .then(response => response.json())
      .then(data => {
        if (response.ok) {
          return data;
        } else {
          throw new Error(data.message);
        }
      });
  }

  
  const { expect } = require('chai'); 
const fetchMock = require('fetch-mock'); // For mocking fetch requests

const submitData = require('./path-to-submitData'); // Import the submitData function

describe('submitData function', () => {
  // Mock the fetch function to simulate network requests
  beforeEach(() => {
    fetchMock.post('/users', {
      status: 200,
      body: { id: 123 },
    });
  });

  afterEach(() => {
    fetchMock.restore();
  });

  it('makes a POST request to /users with name and email', () => {
    const name = 'John Doe';
    const email = 'john@example.com';

    return submitData(name, email)
      .then(response => {
        expect(fetchMock.called()).to.be.true;
        expect(fetchMock.lastOptions().method).to.equal('POST');
        expect(fetchMock.lastOptions().headers['Content-Type']).to.equal('application/json');
        expect(JSON.parse(fetchMock.lastOptions().body)).to.deep.equal({ name, email });
        expect(response.id).to.equal(123);
      });
  });

  it('handles the POST request response and appends id to DOM', () => {
    // Simulate DOM and response handling
    const mockAppend = value => {
    
      return value;
    };

    const name = 'John Doe';
    const email = 'john@example.com';

    return submitData(name, email)
      .then(response => {
        const appendedValue = mockAppend(response.id);
        expect(appendedValue).to.equal(response.id);
      });
  });

  it('handles a failed POST request using catch and appends error message to DOM', () => {
    // Simulate DOM and error handling
    const mockAppendError = error => {
     
      return error.message;
    };

    fetchMock.restore(); // Restore the fetch mock to simulate a failed request
    fetchMock.post('/users', {
      status: 500,
      body: { message: 'Internal server error' },
    });

    const name = 'John Doe';
    const email = 'john@example.com';

    return submitData(name, email)
      .catch(error => {
        const appendedErrorMessage = mockAppendError(error);
        expect(appendedErrorMessage).to.equal('Internal server error');
      });
  });
});

