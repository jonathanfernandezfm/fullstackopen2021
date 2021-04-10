describe('Blog app', function () {
	beforeEach(function () {
		cy.request('POST', 'http://localhost:3003/api/testing/reset');
		cy.request('POST', 'http://localhost:3003/api/users', {
			username: 'jonathan',
			name: 'Jonathan',
			password: 'test123',
		});
		cy.request('POST', 'http://localhost:3003/api/users', {
			username: 'jonathan2',
			name: 'Jonathan2',
			password: 'test123',
		});
		cy.clearLocalStorage();
		cy.visit('http://localhost:3000');
	});

	it('5.17 > Login form is shown', function () {
		cy.get('input#username');
		cy.get('input#password');
	});

	describe('5.18 > Login', function () {
		it('succeeds with correct credentials', function () {
			cy.get('input#username').type('jonathan');
			cy.get('input#password').type('test123');
			cy.contains('login').click();
		});

		it('fails with wrong credentials', function () {
			cy.get('input#username').type('jonathan_error');
			cy.get('input#password').type('test123_error');
			cy.contains('login').click();
			cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)');
		});
	});

	describe('5.19 > When logged in', function () {
		beforeEach(function () {
			cy.get('input#username').type('jonathan');
			cy.get('input#password').type('test123');
			cy.contains('login').click();
		});

		it('A blog can be created', function () {
			cy.contains('create new blog').click();
			cy.get('input#title').type('Test Blog');
			cy.get('input#author').type('Jonathan');
			cy.get('input#url').type('https://www.fullstackopen.com');
			cy.contains('create').click();
			cy.get('.notification').should('have.css', 'color', 'rgb(0, 128, 0)').contains('Blog created');
			cy.get('.blog').contains('Test Blog');
		});

		it('5.20 > User can like blog', function () {
			cy.contains('create new blog').click();
			cy.get('input#title').type('Test Blog');
			cy.get('input#author').type('Jonathan');
			cy.get('input#url').type('https://www.fullstackopen.com');
			cy.contains('create').click();
			cy.contains('view').click();
			cy.contains('like').click();
			cy.get('p').contains('likes 1');
		});

		it('5.21 > User can delete post he created', function () {
			cy.contains('create new blog').click();
			cy.get('input#title').type('Test Blog');
			cy.get('input#author').type('Jonathan');
			cy.get('input#url').type('https://www.fullstackopen.com');
			cy.contains('create').click();
			cy.contains('view').click();
			cy.contains('delete').click();
			cy.get('.notification').should('have.css', 'color', 'rgb(0, 128, 0)').contains('Blog deleted');
		});

		it('5.21 extra > User can not delete post he did not created', function () {
			cy.contains('create new blog').click();
			cy.get('input#title').type('Test Blog');
			cy.get('input#author').type('Jonathan');
			cy.get('input#url').type('https://www.fullstackopen.com');
			cy.contains('create').click();
			cy.wait(1000);
			cy.contains('log out').click();

			cy.contains('log in').click();
			cy.get('input#username').type('jonathan2');
			cy.get('input#password').type('test123');
			cy.contains('login').click();

			cy.contains('view').click();
			cy.contains('delete').should('not.exist');
		});
	});

	describe('5.22 > Ordering', function () {
		beforeEach(function () {
			cy.get('input#username').type('jonathan');
			cy.get('input#password').type('test123');
			cy.contains('login').click();
			for (let i = 0; i < 4; i++) {
				cy.contains('create new blog').click();
				cy.get('input#title').type('Test Blog' + i);
				cy.get('input#author').type('Jonathan');
				cy.get('input#url').type('https://www.fullstackopen.com');
				cy.get('button').contains('create').click();
				cy.wait(500);
			}
		});

		it('blogs ordered by likes', function () {
			cy.get('.blog').each(($el, index) => {
				cy.wrap($el).contains('view').click();
				for (let i = 0; i < index; i++) {
					cy.wrap($el).contains('like').click();
					cy.wait(500);
				}
			});

			cy.get('.blog').each(($el, index) => {
				cy.wrap($el).contains('likes ' + (3 - index));
			});
		});
	});
});
