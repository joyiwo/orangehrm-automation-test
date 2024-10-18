describe('System Users Test Suite', () => {

  // Menjalankan login sebagai admin sebelum menjalankan semua test
  beforeEach(() => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    cy.get('input[name="username"]').type('Admin');  // type username
    cy.get('input[name="password"]').type('admin123');  // type password
    cy.get('button[type="submit"]').click();  // click Login
    cy.url().should('include', '/dashboard');  // masuk dashboard
  });

  it('TC001 - View all system users', () => {
    cy.get('.oxd-main-menu-item--name').contains('Admin').click();  // Click Admin tab
    cy.url().should('include', '/admin/viewSystemUsers');  // Verify masuk Users page
    cy.get('.oxd-table').should('be.visible');  // Verify table is visible
  });

  it('TC002 - Add a new user', () => {
    cy.get('.oxd-main-menu-item--name').contains('Admin').click();  // Click Admin tab
    cy.xpath('//*[@id="app"]/div[1]/div[2]/div[2]/div/div[2]/div[1]/button').click();  // Click 'Add' button

    cy.xpath('//*[@id="app"]/div[1]/div[2]/div[2]/div/div/form/div[1]/div/div[1]/div/div[2]/div/div/div[2]/i').click();  // Open the User Role dropdown
    cy.get('.oxd-select-dropdown').contains('Admin').click();  // Select 'Admin' as User Role

    cy.get('div.oxd-select-text-input').eq(1).click();  // Open the Status dropdown
    cy.get('.oxd-select-dropdown').contains('Enabled').click();  // Select 'Enabled' as Status

    cy.xpath('//*[@id="app"]/div[1]/div[2]/div[2]/div/div/form/div[1]/div/div[2]/div/div[2]/div/div/input').type('joker john selvam').eq(0).click();  // Enter Employee Name

    cy.get('.oxd-autocomplete-dropdown').should('be.visible');
    cy.get('.oxd-autocomplete-option').contains('joker john selvam').click();  // Select suggestion "joker john selvam"

    cy.xpath('//*[@id="app"]/div[1]/div[2]/div[2]/div/div/form/div[1]/div/div[4]/div/div[2]/input').type('testuser1');  // Enter Username
    cy.xpath('//*[@id="app"]/div[1]/div[2]/div[2]/div/div/form/div[2]/div/div[1]/div/div[2]/input').type('password123');  // Enter Password
    cy.xpath('//*[@id="app"]/div[1]/div[2]/div[2]/div/div/form/div[2]/div/div[2]/div/div[2]/input').type('password123');  // Confirm Password
    cy.get('button[type="submit"]').click();  // Click 'Save'
    cy.get('.oxd-toast').should('contain', 'Successfully Saved');  // Verify success message
  });

  it('TC003 - Add a new user with an existing username', () => {
    cy.get('.oxd-main-menu-item--name').contains('Admin').click();  // Click Admin tab
    cy.xpath('//*[@id="app"]/div[1]/div[2]/div[2]/div/div[2]/div[1]/button').click();  // Click 'Add' button

    cy.xpath('//*[@id="app"]/div[1]/div[2]/div[2]/div/div/form/div[1]/div/div[1]/div/div[2]/div/div/div[2]/i').click();  // Open the User Role dropdown
    cy.get('.oxd-select-dropdown').contains('Admin').click();  // Select 'Admin' as User Role
 
    cy.get('div.oxd-select-text-input').eq(1).click();  // Open the Status dropdown
    cy.get('.oxd-select-dropdown').contains('Enabled').click();  // Select 'Enabled' as Status

    cy.get('div.oxd-select-text-input').eq(1).click();  // Open the Status dropdown
    cy.get('.oxd-select-dropdown').contains('Enabled').click();  // Select 'Enabled' as Status

    cy.xpath('//*[@id="app"]/div[1]/div[2]/div[2]/div/div/form/div[1]/div/div[2]/div/div[2]/div/div/input').type('joker john selvam').eq(0).click();  // Enter Employee Name

    // Wait for the suggestion dropdown to appear, then click the correct suggestion
    cy.get('.oxd-autocomplete-dropdown').should('be.visible');  // Ensure dropdown is visible
    cy.get('.oxd-autocomplete-option').contains('joker john selvam').click();  // Select suggestion "joker john selvam"


    cy.xpath('//*[@id="app"]/div[1]/div[2]/div[2]/div/div/form/div[1]/div/div[4]/div/div[2]/input').type('testuser1');  // Enter Username
    cy.xpath('//*[@id="app"]/div[1]/div[2]/div[2]/div/div/form/div[2]/div/div[1]/div/div[2]/input').type('password123');  // Enter Password
    cy.xpath('//*[@id="app"]/div[1]/div[2]/div[2]/div/div/form/div[2]/div/div[2]/div/div[2]/input').type('password123');  // Confirm Password
    cy.get('button[type="submit"]').click();  // Click 'Save'

    cy.xpath('//*[@id="app"]/div[1]/div[2]/div[2]/div/div/form/div[1]/div/div[4]/div/span').contains('Already exists')
    // cy.get('.oxd-toast').should('contain', 'Already exists');  // Verify error message
  });

  it('TC004 - Edit an existing user', () => {
    cy.get('.oxd-main-menu-item--name').contains('Admin').click();  // Click Admin tab
    cy.xpath('//*[@id="app"]/div[1]/div[2]/div[2]/div/div[2]/div[3]/div/div[2]/div[1]/div/div[6]/div/button[2]/i').click(); // click edit user
    cy.xpath('//*[@id="app"]/div[1]/div[2]/div[2]/div/div/form/div[1]/div/div[4]/div/div[2]/input').clear().type('edituser1');  // Edit Username
    cy.get('button[type="submit"]').click();  // Click 'Save'
    cy.get('.oxd-toast').should('contain', 'Successfully Updated');  // Verify success message
  });

  it('TC005 - Edit a user with invalid data', () => {
    cy.get('.oxd-main-menu-item--name').contains('Admin').click();  // Click Admin tab
    cy.xpath('//*[@id="app"]/div[1]/div[2]/div[2]/div/div[2]/div[3]/div/div[2]/div[1]/div/div[6]/div/button[2]/i').click();  // Click on the user edit
    cy.xpath('//*[@id="app"]/div[1]/div[2]/div[2]/div/div/form/div[1]/div/div[4]/div/div[2]/input').clear()  // Clear Username field
    cy.get('button[type="submit"]').click();  // Click 'Save'
    cy.xpath('//*[@id="app"]/div[1]/div[2]/div[2]/div/div/form/div[1]/div/div[4]/div/span').contains('Required')  // Verify error message
  });

  it('TC006 - Delete an existing user', () => {
    cy.get('.oxd-main-menu-item--name').contains('Admin').click();  // Click Admin tab
    cy.xpath('//*[@id="app"]/div[1]/div[2]/div[2]/div/div[2]/div[3]/div/div[2]/div[3]/div/div[6]/div/button[1]/i').click();  // Click delete
    cy.get('button.oxd-button--label-danger').click();  // Confirm delete
    cy.get('.oxd-toast').should('contain', 'Successfully Deleted');  // Verify success message
  });

  it('TC007 - Search for a user by username', () => {
    cy.get('.oxd-main-menu-item--name').contains('Admin').click();  // Click Admin tab
    cy.xpath('//*[@id="app"]/div[1]/div[2]/div[2]/div/div[1]/div[2]/form/div[1]/div/div[1]/div/div[2]/input').type('testuser1');  // Enter Username
    cy.get('button[type="submit"]').click();  // Click 'Search'
    cy.get('.oxd-table-body').should('contain', 'testuser');  // Verify user appears in results
  });

});
