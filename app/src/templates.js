export default () => [
	{
		id: 'tshirts-jeans',
		name: 'T-shirts + Jeans',
		components: [
			{
				id: 'top',
				name: 'T-Shirts',
				icon: 'tshirts',
				tags: [
					'Category:T-Shirts'
				]
			},

			{
				id: 'pants',
				name: 'Jeans',
				icon: 'jeans',
				tags: [
					'Category:Jeans'
				]
			}
		],

		colorCandidates: [
			{
				id: 'black-black',
				name: 'Black + Black',
				components: [
					{
						id: 'top',
						color: '검정색'
					},

					{
						id: 'pants',
						color: '검정색'
					}
				]
			}
		]
	},

	{
		id: 'hoodie-slacks',
		name: 'Hoodie + Slacks',
		components: [
			{
				id: 'top',
				name: 'Hoodie',
				icon: 'hoodie',
				tags: [
					'Category:T-Shirts'
				]
			},

			{
				id: 'pants',
				name: 'Jeans',
				icon: 'jeans',
				tags: [
					'Category:Jeans'
				]
			}
		],

		colorCandidates: [
			{
				id: 'black-black',
				name: 'Black + Black',
				components: [
					{
						id: 'top',
						color: '검정색'
					},

					{
						id: 'pants',
						color: '검정색'
					}
				]
			}
		]
	},

	{
		id: 'cardigan-shirts',
		name: 'Cardigan + Shirts',
		components: [
			{
				id: 'top',
				name: 'Cardigan',
				icon: 'cardigan',
				tags: [
					'Category:T-Shirts'
				]
			},

			{
				id: 'pants',
				name: 'Shirts',
				icon: 'shirts',
				tags: [
					'Category:T-Shirts'
				]
			}
		],

		colorCandidates: [
			{
				id: 'black-black',
				name: 'Black + Black',
				components: [
					{
						id: 'top',
						color: '검정색'
					},

					{
						id: 'pants',
						color: '검정색'
					}
				]
			}
		]
	}
];
