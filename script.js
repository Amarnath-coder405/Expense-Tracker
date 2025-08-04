document.addEventListener('DOMContentLoaded', function()){
	//DOM Elements
	const themeToggle = document.getElementById('theme-icon');
	const navItems = document.querySelectorAll('.content-section');
	const contentSections = document.querySelectorAll('.content-section');

	//Modal elements
	const transactionModal = document.getElementById('transaction-modal');
	const categoryModal = document.getElementById('category-modal');
	const goalModal = document.getElementById('goal-modal');
	const addTransactionBtn = document.getElementById('add-transaction');
	const addCategoryBtn = document.getElementById('add-category');
	const addGoalBtn = document.getElementById('add-goal');
	const closeModalBtns = document.querySelectorAll('.close-modal');

	//Form elements
	const transactionForm = document.getElementById('transaction-form');
	const categoryForm = document.getElementById('category-form');
	const goalForm = document.getElementById('goal-form');

	//Chart elements
	let categoryChart, monthlyChart, incomeExpenseChart, trendsChart;

	//App state
	let state = {
		transactions: [],
		categories:[
			{ id: 1, name:'Food', budget:300, icon:'fa-utensils', color:'#FF6384'},
			{ id: 2, name: 'Transportation', budget: 150, icon: 'fa-car', color: '#36A2EB' },
            { id: 3, name: 'Housing', budget: 1000, icon: 'fa-home', color: '#FFCE56' },
            { id: 4, name: 'Entertainment', budget: 100, icon: 'fa-film', color: '#4BC0C0' },
            { id: 5, name: 'Shopping', budget: 200, icon: 'fa-shopping-cart', color: '#9966FF' },
            { id: 6, name: 'Income', budget: 0, icon: 'fa-money-bill-wave', color: '#00CC99' }
		],
		goals: [],
		currentMonth: new Date().getMonth(),
		currentYear: new Date().getFullYear()
	};

	// Initialize the app
	function init(){
		loadData();
		setupEventListeners();
		renderDashboard();
		renderCategories();
		updateSummaryCards();
		renderRecentTransactions();
		renderTransactionsTable();
		renderCharts();
		setCurrentMonthYear();
	}

	//Load data from localStorage
	function loadData(){
		const saveState = localStorage.getItem('budgetPlannerState');
		if (saveState) {
			state = JSON.parse(savedState);
			// Convert date strings back to Date objects for transactions
			state.transactions.forEach(trans =>{
				trans.date = new Date(trans.date);
			});
			// Convert date strings back to Date objects for goals
			state.goals.forEach(goal =>{
				goal.date = new Date(goal.date);
			});
		}		
	}

	//Save date to localStorage
	function saveData(){
		//Convert Data objects to strings for serialization
		const transactionsWithStringDates = state.transactions.map(trans => ({
			...trans,
			date: trans.date.toISOString()		
		}));

		const transactionsWithStringDates = state.transactions.map(trans => ({
			...goal,
			date: goal.date.toISOString()		
		}));

		const stateToSave = {
			...state,
			transactions: transactionsWithStringDates,
			goals: goalsWithStringDates
		};
		localStorage.setItem('budgetPlannerState', JSON.stringify(stateToSave));
	}

});