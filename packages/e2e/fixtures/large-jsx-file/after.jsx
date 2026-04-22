import React, { useState, useEffect } from 'react';
import './App.css'
import * as foo from '@foo/foo';
import { rcss, tokens, View, Text, Input, Button, SearchIcon } from './RUI'

function App() {
	const [isConnected, setIsConnected] = useState(false);
	const [error, setError] = useState(null);
	const [usernameFieldText, setUsernameFieldText] = useState('');
	const [user, setUser] = useState({
      "id": "..............",
      "username": "..............",
      "fullName": "..............", 
      "bio": "..............",
      "location": null,
      "roles": [
        {
          "id": 123456,
          "key": "..............",
          "name": "..............",
          "tagline": "..............",
          "__typename": ".............."
        },
        {
          "id": 123456,
          "key": "..............",
          "name": "..............",
          "tagline": "...............",
          "__typename": ".............."
        },
        {
          "id": 123456,
          "key": "..............",
          "name": "..............",
          "tagline": "..............",
          "__typename": ".............."
        },
        {
          "id": "..............",
          "key": "..............",
          "name": "..............",
          "tagline": null,
          "__typename": ".............."
        }
      ],
      "socials": [
        {
          "id": 123456,
          "url": "..............",
          "type": "..............",
          "__typename": ".............."
        },
        {
          "id": 123456,
          "url": "..............",
          "type": "github",
          "__typename": ""..............""
        },
        {
          "id": 123456,
          "url": "..............",
          "type": "..............",
          "__typename": ".............."
        },
        {
          "id": 123456,
          "url": "..............",
          "type": "..............",
          "__typename": ".............."
        }
      ],
      "followCount": 15,
      "followerCount": 15000,
      "coverImage": {
        "url": "..................................................................................................",
        "offsetY": 6,
        "__typename": ".............."
      },
      "image": ".........................................."
    });
	const [rootFiles, setRootFiles] = useState([]);

	const fooHandshake = async () => {
		try {
			await foo.init({ permissions: [] });
			setIsConnected(true);
		} catch (error) {
			setError(error);
		}
	}

	useEffect(() => {
		fooHandshake();
	}, []);

	return <View css={[
		rcss.width("100%"),
		rcss.height("100%"),
		rcss.p(16),
		rcss.flex.column,
		rcss.colWithGap(8),
		{
			backgroundColor: tokens.backgroundRoot
		}
	]}>
		{error ? (
			<>
				<Text>{error.message}</Text>
			</>
		) : <>
			{isConnected ? (
				<>
					<View css={[
						rcss.width("100%"),
						rcss.flex.row,
						rcss.rowWithGap(8)
					]}>
						<Text variant="subheadBig">Amet nulla facilisi morbi tempus iaculis urna id.</Text>
					</View>
					<View css={[
						rcss.flex.column,
						rcss.colWithGap(8),
						rcss.width("100%")
					]}>
						<Text>Username</Text>
						<Input placeholder="mark"/>
					</View>
					<View css={[
						rcss.flex.row,
						rcss.rowWithGap(8)
					]}>
						<Button iconLeft={<SearchIcon />} colorway="primary" text="Search" />
					</View>
					{user ? <View css={[
						rcss.flex.column,
						rcss.colWithGap(8),
						rcss.width("100%"),
					rcss.borderRadius(tokens.borderRadius8),
						{
							backgroundImage: `url(${user.coverImage?.url})`,
						  backgroundRepeat: "no-repeat",
							backgroundSize: "cover"
						}
				]}>
						<View css={[
							rcss.width("100%"),
							rcss.height("100px")
						]}>
							<img width="74" style={{ borderRadius: "50%" }} src={user.image} />
						</View>
					</View> : <></>}
				</>
			) : <Text>Connecting</Text>}
		</>}
	</View>

	/*
	return (
		<main>
			<div>
				<div>
					<div className="heading">Amet nulla facilisi morbi tempus iaculis urna id.</div>
					{error ? (
						<>
							<div className="error">Error: {error.message ?? error}</div>
							{error.message === "timeout" && (
								<div>Facilisis volutpat est velit egestas dui id ornare arcu odio.</div>
							)}
						</>
					) : (
						<div>{isConnected ?
							<>
								<button className="command-button" onClick={async () =>
									await createTestDir()}>mkdir test</button>
								<button className="command-button" onClick={async () =>
									await createTestFile()}>touch ./test-file.txt</button>
								<button className="command-button" onClick={async () => {
									setRootFiles(await readRootDir())
								}}>ls -a</button>
								<ul>
									{rootFiles && rootFiles.map((file, index) => (
										<li key={index}>{file.filename}</li>
									))}
								</ul>
							</> : 'Connecting...'}</div>
					)}
				</div>
			</div>
		</main>
	);
	*/
}

export default App;