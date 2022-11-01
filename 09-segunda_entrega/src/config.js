export default {

	/* fileSystem: {
		path: "./DB",
	}, */

	mongodb: {
		cnxStr: 'mongodb+srv://backend:Camila1998@cluster0.wsrnaq4.mongodb.net/ecommerce',
		options: {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			serverSelectionTimeoutMS: 5000,
		},
	},

	firebase: {
		"type": "service_account",
		"project_id": "coderhousebackend-5e185",
		"private_key_id": "b878834c19e5f044c8adc9553696c1061839cad2",
		"private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCt655SJpOqTlW3\nTCcCP/0TJTno69EBZ08ylSlxLbG2kwmJFfbH6oBHYnDUke2LntICd6nwLaiGrVep\nNbgDfTF/ekhqjcWOZJz7r2AXwtlxp6iAlMc/RKaqA1OWejRjxND5G8ZpVWe6zut3\ntE8lID6USoMuGU0bhFsRtG/EQKDfCOThfuqkZqoq4xm3hgm3CTG4AVzTSrrCvtVk\njtmUljDEAwyHxYBFJw23KcubSIIcmlW+9umE/FWYDL+s0i/CornhLBtXFkfP6fO8\nSykgjT/XAylVSYy9584WzfWL75F/qsDFc8BvDjWG5S2tv0DwrfjgcHHmjtlLKn1m\nFIxNEG3FAgMBAAECggEAC59XMexiigBt9s/CZpfXRh2C0xzZLNkWIDj6xJW2DnpL\n1Or7FiKGu95+pZydOCtJo6u9V0UnLIgud2q/1znZTN3OM5Kxp6Ged6z2r2J7If7U\ngkfkUHHPxRpE+SVwVVTR1efZg0YCESg38O9Y1Pq55ofb4CuFgofT3H5x8/aRWZN+\nrBn6bHP0B/wCtj+GRRgwgXcCMSNkyTk0U87y8MfKvCpkiF8L9MrjnvFjglKtqzcm\nVExfslWQEsRi/SbWfvBgsYda0mguFEk2TOLYljkPk7yLiRbRlg9e+ULTlQQmA0Yx\nv2U5z6ltF8Chze3ZXCc/y3V2HSk/G6fkyM+sdCTx0QKBgQDnuYQGjDqfMAAgejJI\nwAU5ItXJzgTbmUkyjG0DC/hzsEd2fNYpRZ54V8XH+VUWnrbUYp3ld7spnnCjOu8y\nd20RcLgjendofRvi31npuwPdjfF2aG+SeFeZE4Lk9pKAkyb6ijBU6uDSvyRI/H8c\nRz2gixMhEZrz3wgch9cIZkon9QKBgQDAI+JoTfw6rm12NPCgRx93otAz+OP3oKBZ\nAy+ph+fwX0Lg8xEbRz62sODoJHcu684+ymXnr10jIRyeqpEpQPfdh6Q0oL/8oAJf\nFkQ6a1HbALiysDwEepesKCUalBBoefk/w8byXoPIuMHDDc/NzO2Wr5JjCaWE7o67\n/oOBzE0ckQKBgEssnw00vuvXuaLPobKCQO+JQowGfwLy1pFEhzT+1CpL3NMuqpeX\nE1L9PpeiZp1A/hUmrQy9bAWTdf0uaF0Z61NGGya/Wy+Vrs9KIDQ4TIe6vcPpG5EL\n43cwoj0/VMXLd1C+NfHGhQs5oT7gUyhMYEzN8XW/7WICT/JZi0QZUyNlAoGBAJGi\nIVfB1G5+C0XPdptljTpW08yw18m3nBIb0iKDeo+9BKoQUmUEqUo74xzRluyfmuII\n8xia2NNpo5G34vML5VOqHhItzZcjiOidrfVBpveCInx+C9+xNAkvHIB6vb0SxpNI\nRyEp9mVLdMHtVBa/P045oZEjnKuXTeS8Ut0tBz2hAoGAdRrXn6pJMZWz+Fn03ppf\n8KatyfvokdcXqnbObVs5s/eqjp25cBFgUJT1YmXAUPfJdG1Zg0eJBSiqvD3EIHZh\nQ/Nj3x9HxrtHpnnB4T1iwGHxBL9JiH/O5BQx1i6DVbsRzosuZwHC9y3IDzjYzi8l\nbAy1KxJf+3i2iSD5vzIx0vM=\n-----END PRIVATE KEY-----\n",
		"client_email": "firebase-adminsdk-sx3mp@coderhousebackend-5e185.iam.gserviceaccount.com",
		"client_id": "117530714884916395743",
		"auth_uri": "https://accounts.google.com/o/oauth2/auth",
		"token_uri": "https://oauth2.googleapis.com/token",
		"auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
		"client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-sx3mp%40coderhousebackend-5e185.iam.gserviceaccount.com"
	},

	/* sqlite3: {
		client: 'sqlite3',
		connection: {
			filename: './db/ecommerce.sqlite',
		},
		useNullAsDefault: true,
	},

	mariaDb: {
		client: 'mysql',
        connection: {
            host: '127.0.0.1',
            port: 3306,
            user: 'root',
            password: '',
            database: 'coderhouse',
        },
	}, */
};
