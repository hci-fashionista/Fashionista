const schemes = [
	{
		id: 'white',
		name: '흰색',
		color: '#ffffff'
	},
	{
		id: 'silver',
		name: '은색',
		color: '#d0d0d0'
	},
	{
		id: 'lightgray',
		name: '라이트 그레이',
		color: '#c0c0c0'
	},
	{
		id: 'gray',
		name: '회색',
		color: '#808080'
	},
	{
		id: 'darkgray',
		name: '다크 그레이',
		color: '#404040'
	},
	{
		id: 'black',
		name: '검정색',
		color: '#000000'
	},
	{
		id: 'deepred',
		name: '딥 레드',
		color: '#9c2336'
	},
	{
		id: 'red',
		name: '빨간색',
		color: '#e80416'
	},
	{
		id: 'raspberry',
		name: '라즈베리',
		color: '#d74061'
	},
	{
		id: 'neonpink',
		name: '네온 핑크',
		color: '#df1895'
	},
	{
		id: 'pink',
		name: '핑크',
		color: '#f7119e'
	},
	{
		id: 'lightpink',
		name: '라이트 핑크',
		color: '#ffa3b6'
	},
	{
		id: 'palepink',
		name: '페일 핑크',
		color: '#dca69c'
	},
	{
		id: 'peach',
		name: '피치',
		color: '#faab8d'
	},
	{
		id: 'coral',
		name: '코랄',
		color: '#ed6859'
	},
	{
		id: 'lightorange',
		name: '라이트 오렌지',
		color: '#fe7c00'
	},
	{
		id: 'neonorange',
		name: '네온 오렌지',
		color: '#fd5c01'
	}
];

const colors = schemes.reduce((colors, scheme) => {
	colors[scheme.id] = scheme;
	return colors;
}, {});

export default colors;
