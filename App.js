import { StatusBar } from 'expo-status-bar';
import { Animated, ImageBackground, StyleSheet, Text, View, Button, Image, Pressable, Dimensions } from 'react-native';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator} from '@react-navigation/native-stack';
import mapSrc from './assets/Images/Route66map.png'
//defined dimensions
const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;
//generic button component
const GenButton = (props) => {
  const {title = props.text } = props;
  return (
    <Pressable style={props.butStyle} onPress = {props.whenPressed}>
      <Text style={props.butStyleText}>{title}</Text>
    </Pressable>
  );
}

//text that fades in
const FadeInText = (props) => {
	const [fadeAnim] = React.useState(new Animated.Value(0));
	React.useEffect(() => {
		Animated.timing(
			fadeAnim,
			{
				toValue: 1,
				duration: 1000,
				useNativeDriver: true,
			}
		).start();
	}, []);
	return (
		<Animated.Text style={[props.style, {opacity: fadeAnim}]}>
			{props.text}
		</Animated.Text>
	);
}

//image that fades in
const FadeInImage = (props) => {
	const [fadeAnim] = React.useState(new Animated.Value(0));
	React.useEffect(() => {
		Animated.timing(
			fadeAnim,
			{
				toValue: 1,
				duration: 1000,
				useNativeDriver: true,
			}
		).start();
	}, []);
	return (
		<Animated.Image style={[props.style, {opacity: fadeAnim}]}>
			{props.image}
		</Animated.Image>
	);
}
const MultipleChoice = (props) => {
	const [selected, setSelected] = React.useState(false);
	return(
		<View style={{flexDirection: 'column'}}>
			<GenButton text = {props.text1} butStyle={buttonStyles.multipleSelectButton} butStyleText={buttonStyles.multipleSelectText}
				whenPressed={()=> {
					if(props.rightAns==1){
						props.event();
					}else{
						props.wrong();
					}
			}}/>
			<GenButton text = {props.text2} butStyle={buttonStyles.multipleSelectButton} butStyleText={buttonStyles.multipleSelectText}
				whenPressed={()=> {
					if(props.rightAns==2){
						props.event();
					}else{
						props.wrong();
					}
			}}/>
			<GenButton text = {props.text3} butStyle={buttonStyles.multipleSelectButton} butStyleText={buttonStyles.multipleSelectText}
				whenPressed={()=> {
					if(props.rightAns==3){
						props.event();
					}else{
						props.wrong();
					}
			}}/>
			<GenButton text = {props.text4} butStyle={buttonStyles.multipleSelectButton} butStyleText={buttonStyles.multipleSelectText}
				whenPressed={()=> {
					if(props.rightAns==4){
						props.event();
					}else{
						props.wrong();
					}
			}}/>
		</View>
		
	);
}

const BackArrow = (props) => {
	return(
			<GenButton text = "Back" whenPressed={() => {props.event();}} butStyleText={buttonStyles.backButtonText} butStyle={buttonStyles.backButton}/>
	);
}

const MultipleSelectOption = (props) => {
	const [pressed, setPressed] = React.useState(false);
	function Update() {
		setPressed(!pressed);
	}
	return(
		<GenButton text = {props.text} butStyle={[buttonStyles.multipleSelectButton, {borderColor: (!pressed)?'#fff':'#e6d62c', shadowColor: (!pressed)?'#656565':'#dbdb04'}]} butStyleText={buttonStyles.multipleSelectText}
			whenPressed={()=> {props.event();Update();}}/>
	);
}

const MultipleSelect = (props) => {
	const [oneState, setOneState] = React.useState(false);
	const [twoState, setTwoState] = React.useState(false);
	const [threeState, setThreeState] = React.useState(false);
	const [fourState, setFourState] = React.useState(false);
	const [fiveState, setFiveState] = React.useState(false);
	const UpdateOne = () => {
		setOneState(!oneState);
	}
	const UpdateTwo = () => {
		setTwoState(!twoState);
	}
	const UpdateThree = () => {
		setThreeState(!threeState);
	}
	const UpdateFour = () => {
		setFourState(!fourState);
	}
	const UpdateFive = () => {
		setFiveState(!fiveState);
	}
	return(
		<View style={{flexDirection: 'column'}}>
			<MultipleSelectOption text = {props.text1} event={(UpdateOne)}/>
			<MultipleSelectOption text = {props.text2} event={UpdateTwo}/>
			<MultipleSelectOption text = {props.text3} event={UpdateThree}/>
			<MultipleSelectOption text = {props.text4} event={UpdateFour}/>
			<MultipleSelectOption text = {props.text5} event={UpdateFive}/>
			<GenButton text = {"Submit"} butStyle={buttonStyles.submitButton} butStyleText={buttonStyles.multipleSelectText} 
			whenPressed = {() => 
			{if(oneState==props.conditional[0]&&twoState==props.conditional[1]&&threeState==props.conditional[2]&&fourState==props.conditional[3]&&fiveState==props.conditional[4])
				props.correct();
			else{props.incorrect();}}}/>
		</View>
	);
}

const NextPage = (props) => {
	return (
		<View style={styles.container}>
			<ImageBackground source = {props.imgbg} style = {styles.container}>
				<FadeInText style={props.textStyle} text={props.text}/>
				<GenButton text = "Next" whenPressed={() => {props.event();}} butStyleText={buttonStyles.nextButtonText} butStyle={buttonStyles.nextButton}/>
				<BackArrow event={props.back}/>
				<StatusBar style="auto" />
			</ImageBackground>
		</View>
	);
}


//home page
function HomeScreen({navigation}) {
   return(
    <View style={styles.container}>
	  <ImageBackground source = {require('./assets/Images/dust-storm-vertical.png')} style = {styles.container}>
	  	<FadeInText text={"Escape the Dust Bowl"} style={styles.title}/>
		<GenButton text = "Play" whenPressed={() =>  navigation.navigate('Information1')} butStyleText={buttonStyles.startButtonText} butStyle={buttonStyles.startButton}/>
		
		<StatusBar style="auto" />
	  </ImageBackground>
    </View>
  );
}

//Gamve Over Screen
function GameOverScreen({route, navigation}) {
	const message = route.params.message;
	  return(
    <View style={styles.container}>
	  <ImageBackground source = {require('./assets/Images/dust-storm-vertical.png')} style = {styles.container}>
	  	<FadeInText text={"Game Over"} style={styles.title}/>
		<FadeInText text={message} style={styles.instructions}/>
		<GenButton text = "Go Back" whenPressed={() =>  navigation.goBack()} butStyleText={buttonStyles.startButtonText} butStyle={buttonStyles.startButton}/>
		
		<StatusBar style="auto" />
	  </ImageBackground>
    </View>
  );
}
//information page
function Information1({navigation}) {
	const GoNext = () => {
		navigation.navigate('Information2');
	}
	return(
			<NextPage text="In the 1920s to 1930s, low crop prices and high machinery costs led to overproduction of crops. Farmers used dry farming techniques that worsened the quality of soil." event={GoNext} imgbg={require('./assets/Images/dust-storm-vertical.png')} textStyle={styles.instructions} back={() => {navigation.goBack()}}/>
	);
}
function Information2({navigation}){
	return (
		<NextPage text = "As a result of dry farming and major droughts in the area, huge dust storms arose in the midwest, beginning the Dust Bowl. At the same time, several factors including a market crash led to the Great Depression." event={() => {navigation.navigate('Instructions');}} imgbg={require('./assets/Images/dust-storm-vertical.png')} textStyle={styles.instructions} back={() => {navigation.goBack()}}/>
	);
}

//instructions page
function Instructions({navigation}) {
	return (
		/*<View style={styles.container}>
			<ImageBackground source = {require('./assets/Images/dust-storm-vertical.png')} style = {styles.container}>
				<FadeInText style={styles.instructions} text={"You are an Oklahoma farmer that is suffering from the Dust Bowl and the Great Depression. You must decide whether to stay and face the dust storms or leave and try to get to better conditions. "}/>
				<View style={{flexDirection: 'row'}} >
					<GenButton text = "Stay" whenPressed={() => navigation.navigate('StayPath')} butStyleText={buttonStyles.nextButtonText} butStyle={buttonStyles.leftButton}/>
					<GenButton text = "Leave" whenPressed={() => navigation.navigate('LeavePath')} butStyleText={buttonStyles.nextButtonText} butStyle={buttonStyles.rightButton}/>
				</View>
				<BackArrow event={() => navigation.goBack()}/>
				<StatusBar style="auto" />
			</ImageBackground>
		</View>*/
		<NextPage text = "You are an Oklahoma farmer that is suffering from the Dust Bowl and the Great Depression. You decide whether to leave and try to get to better conditions. " event={() => navigation.navigate('LeavePath')} imgbg={require('./assets/Images/dust-storm-vertical.png')} textStyle={styles.instructions} back={() => navigation.goBack()}/>
	);
}
//initial leave path screen
function LeavePath({navigation}){
	const CorrectAction = () => {
		navigation.navigate('CorrectBelongings');
	}
	const IncorrectAction = () => {
		navigation.navigate('GameOverScreen', {message: 'You should bring everything you can.'});
	}
	return (
		<View style={styles.container}>
			<ImageBackground source = {require('./assets/Images/car-trunk.jpg')} style = {styles.container}>
				<FadeInText style={styles.instructionsWithBg} text={"You must decide what to bring with you. Select all items you want to bring."}/>
				<MultipleSelect text1={"Money"} text2={"Wheat"} text3={"Water"} text4={"Corn"} text5={"Tent"} conditional={[true,true,true,true,true]} correct={(CorrectAction)} incorrect={(IncorrectAction)} />
				<StatusBar style="auto" />
				<BackArrow event={() => navigation.goBack()}/>
			</ImageBackground>
		</View>
	);
}

function CorrectBelongings({navigation}){
	return(
		<NextPage text="You decide to bring everything you can." event={() => {navigation.navigate('ChooseSellFarm');}} back={() => {navigation.goBack()}} textStyle={styles.instructionsWithBg} imgbg={require('./assets/Images/car-trunk.jpg')}/>
	);
}

function ChooseSellFarm({navigation}){
	return(
		<View style={styles.container}>
			<ImageBackground source = {require('./assets/Images/farm-pic.png')} style = {styles.container}>
				<FadeInText style={styles.instructionsWithBg} text={"Should you sell your farm for the little money you can get to bring with you?"}/>
				<View style={{flexDirection: 'row'}} >
					<GenButton text = "No" whenPressed={() => navigation.navigate('GameOverScreen', {message: 'You will need all the money you can get in your journey, even if you do not have much.'})} butStyleText={buttonStyles.nextButtonText} butStyle={buttonStyles.leftButton}/>
					<GenButton text = "Yes" whenPressed={() => navigation.navigate('SellFarm')} butStyleText={buttonStyles.nextButtonText} butStyle={buttonStyles.rightButton}/>
				</View>
				<BackArrow event={() => navigation.goBack()}/>
				<StatusBar style="auto" />
			</ImageBackground>
		</View>
	);
}

function SellFarm({navigation}){
	return(
		<NextPage text="You decide to sell the farm. You will need all the money you can get." event={() => {navigation.navigate('ChooseRoad');}} imgbg = {require('./assets/Images/farm-pic.png')} textStyle={styles.instructionsWithBg} back={() => {navigation.goBack()}}/>
	);
}
	
function ChooseRoad({navigation}){
	const IncorrectAction = () => {
		navigation.navigate('GameOverScreen', {message: 'The road you picked would not lead you to California.'});
	}
	const CorrectAction = () => {
		navigation.navigate('RouteSixtySix');
	}
	return (
		<View style={styles.container}>
			<ImageBackground source = {require('./assets/Images/split-paths.png')} style = {styles.container}>
				<FadeInText style={styles.instructionsWithBg} text={"You see four possible roads to take. You must choose a road that will take you to California, where conditions are better."}/>
				<MultipleChoice text1={"Route 44"} text2={"Route 66"} text3={"Route 35"} text4={"Lincoln Highway"} rightAns={2} wrong = {(IncorrectAction)} event = {(CorrectAction)} />
				<BackArrow event={() => navigation.goBack()}/>
				<StatusBar style="auto" />
			</ImageBackground>
		</View>
	);
}

function RouteSixtySix({navigation}){
	return(
		<View style={[styles.container, {backgroundColor: '#d6d2c4'}]}>
			{/*<ImageBackground source = {require('./assets/Images/Route66mapwithtruck.png')} style = {styles.container}>*/}
				<FadeInText style={styles.instructions} text={"You decide to take Route 66, which will lead you all the way from Oklahoma to California."}/>
				<Image source = {mapSrc} style = {styles.map}/>
				<GenButton text = "Next" whenPressed={() => navigation.navigate('WhereSleep')} butStyleText={buttonStyles.nextButtonText} butStyle={buttonStyles.nextButton}/>
				<BackArrow event={() => navigation.goBack()}/>
			{/*</ImageBackground>*/}
		</View>
	);
}

function WhereSleep({navigation}){
	const IncorrectAction = () => {
		navigation.navigate('GameOverScreen', {message: 'You can only aford to sleep in a tent beside the road.'});
	}
	const CorrectAction = () => {
		navigation.navigate('SleepCorrect');
	}
	return(
		<View style={styles.container}>
			<ImageBackground source = {require('./assets/Images/tent-beside-road.png')} style = {styles.container}>
				<FadeInText style={styles.instructionsWithBg} text={"Where do you sleep at night on your trip?"}/>
				<MultipleChoice text1={"Hotel"} text2={"House"} text3={"Tent beside road"} text4={"Mansion"} rightAns={3} wrong = {(IncorrectAction)} event = {(CorrectAction)} />
				<BackArrow event={() => navigation.goBack()}/>
				<StatusBar style="auto" />
			</ImageBackground>
		</View>
	);
}
function SleepCorrect({navigation}){
	return(
		<NextPage text="You decide to sleep in a tent beside the road. You cannot afford anything else." event={() => {navigation.navigate('GasStation');}} imgbg={require('./assets/Images/tent-beside-road.png')} textStyle={styles.instructionsWithBg} back={() => {navigation.goBack()}}/>
	);
}

function GasStation({navigation}){
	return(
		<View style={styles.container}>
			<ImageBackground source = {require('./assets/Images/gas-station-background.png')} style = {styles.container}>
				<FadeInText style={styles.instructionsWithBg} text={"You see that your gas is running out, and decide to pull over at a gas station. About how much does gas cost in the 1930s?"}/>
				<MultipleChoice text1={'Over $5'} text2={'Between $3 and $4'} text3={'Less than $1'} text4={'Between $4 and $5'} rightAns={3} wrong = {(() => navigation.navigate('GameOverScreen', {message: 'Gas cost less than that.'}))} event = {(() => navigation.navigate('CorrectGas'))}/>
				<BackArrow event={() => navigation.goBack()}/>
				<StatusBar style="auto" />
			</ImageBackground>
		</View>
	);
}

function CorrectGas({navigation}){
	return(
		<NextPage text="You fill up the gas tank and continue your journey." event={() => {navigation.navigate('NumPeople');}} imgbg={require('./assets/Images/gas-station-background.png')} textStyle={styles.instructionsWithBg} back={() => {navigation.goBack()}}/>
	);
}

function NumPeople({navigation}){
	return(
		<View style={styles.container}>
			<ImageBackground source = {require('./assets/Images/straight-path-question-mark.jpg')} style = {styles.container}>
				<FadeInText style={styles.instructionsWithBg} text={"Do you see a lot of people on your journey?"}/>
				<View style={{flexDirection: 'row'}} >
					<GenButton text = "No" whenPressed={() => navigation.navigate('GameOverScreen', {message: 'During the Dust Bowl, millions of people migrated to the West.'})} butStyleText={buttonStyles.nextButtonText} butStyle={buttonStyles.leftButton}/>
					<GenButton text = "Yes" whenPressed={() => navigation.navigate('NumPeopleCorrect')} butStyleText={buttonStyles.nextButtonText} butStyle={buttonStyles.rightButton}/>
				</View>
				<BackArrow event={() => navigation.goBack()}/>
				<StatusBar style="auto" />
			</ImageBackground>
		</View>
	);
}

function NumPeopleCorrect({navigation}){
	return(
		<NextPage text="Millions of people migrated Westward to escape the Dust Bowl." event={() => {navigation.navigate('GetFood');}} imgbg = {require('./assets/Images/people-on-road.png')} textStyle={styles.instructionsWithBg} back={() => {navigation.goBack()}}/>
	);
}

function GetFood({navigation}){
	return(
		<View style={styles.container}>
			<ImageBackground source = {require('./assets/Images/car-trunk-less-food.jpg')} style = {styles.container}>
				<FadeInText style={styles.instructionsWithBg} text={"You are almost out of food, and have very little money. How will you get more food?"}/>
				<MultipleChoice text1={'Buy canned goods'} text2={'Buy steak'} text3={'Find a restaurant'} text4={'Do not eat'} rightAns={1} wrong = {(() => navigation.navigate('GameOverScreen', {message: 'You should get cheap but nutritious food such as canned goods to eat to save money and refuel yourself.'}))} event = {(() => navigation.navigate('GetFoodCorrect'))}/>
				<BackArrow event={() => navigation.goBack()}/>
				<StatusBar style="auto" />
			</ImageBackground>
		</View>
	);
}

function GetFoodCorrect({navigation}){
	return(
		// <View style={styles.container}>
		// 	<ImageBackground source = {require('./assets/Images/truck-and-sand-storm.jpg')} style = {styles.container}>
		// 		<FadeInText style={styles.instructions} text={"You buy canned goods to eat and take with you."}/>
		// 		<GenButton text = "Next" whenPressed={() => navigation.navigate('DeathValley')} butStyleText={buttonStyles.nextButtonText} butStyle={buttonStyles.nextButton}/>
		// 	</ImageBackground>
		// </View>
		<NextPage text="You buy canned goods, which are cheap and filling, to take with you to get the most out of your money." event={() => {navigation.navigate('ContinueOnJourney');}} imgbg = {require('./assets/Images/can-of-beans.png')} textStyle={styles.instructionsWithBg} back={() => {navigation.goBack()}}/>
	);
}

function ContinueOnJourney({navigation}){
	return(
		<NextPage text="You continue on your journey, filling up gas when you run out and surviving on canned goods for a period of a few days to a week." event={() => {navigation.navigate('DeathValley');}} back={() => {navigation.goBack()}} textStyle={styles.instructionsWithBg} imgbg={require('./assets/Images/straight-path-question-mark.jpg')}/>
	);
}
function DeathValley({navigation}){
	return(
		<View style={styles.container}>
			<ImageBackground source = {require('./assets/Images/death-valley-background.png')} style = {styles.container}>
				<FadeInText style={styles.instructionsWithBg} text={"You have crossed the border of California, but you must cross through Death Valley. Do you go during the day so that it is easier to see and drive or the night so your car doesn't overheat?  "}/>
				<View style={{flexDirection: 'row'}} >
					<GenButton text = "Day" whenPressed={() => navigation.navigate('GameOverScreen', {message: 'Your car overheated, leaving you stranded in Death Valley.'})} butStyleText={buttonStyles.nextButtonText} butStyle={buttonStyles.leftButton}/>
					<GenButton text = "Night" whenPressed={() => navigation.navigate('DeathValleyCorrect')} butStyleText={buttonStyles.nextButtonText} butStyle={buttonStyles.rightButton}/>
				</View>
				<BackArrow event={() => navigation.goBack()}/>
				<StatusBar style="auto" />
			</ImageBackground>
		</View>
	);
}
function DeathValleyCorrect({navigation}){
	return(
		// <View style={styles.container}>
		// 	<ImageBackground source = {require('./assets/Images/truck-and-sand-storm.jpg')} style = {styles.container}>
		// 		<FadeInText style={styles.instructions} text={"You successfully cross Death Valley in the night."}/>
		// 		<GenButton text = "Next" whenPressed={() => navigation.navigate('ReachCalifornia')} butStyleText={buttonStyles.nextButtonText} butStyle={buttonStyles.nextButton}/>
		// 	</ImageBackground>
		// </View>
		<NextPage text="You successfully cross Death Valley in the night." event={() => {navigation.navigate('ReachCalifornia');}} imgbg={require('./assets/Images/death-valley-background.png')} textStyle={styles.instructionsWithBg} back={() => {navigation.goBack()}}/>
	);
}
function ReachCalifornia({navigation}){
	return(
		// <View style={styles.container}>
		// 	<ImageBackground source = {require('./assets/Images/truck-and-sand-storm.jpg')} style = {styles.container}>
		// 		<FadeInText style={styles.instructions} text={"You reach the interior of California and see many other people who travelled the same road as you. You see that the people there look at you with hostility, and many tell you to go back where you came from. Although you reached your destination, you know life will not be easy."}/>
		// 		<GenButton text = "Next" whenPressed={() => navigation.navigate('ChooseSettlement')} butStyleText={buttonStyles.nextButtonText} butStyle={buttonStyles.nextButton}/>
		// 	</ImageBackground>
		// </View>
		<NextPage text="You soon reach San Joaquin, California and see many other people who travelled the same road as you. Although you reached your destination, you know life will not be easy." event={() => {navigation.navigate('ChooseIfFindJobHard');}} imgbg = {require('./assets/Images/arrive-in-CA.png')} textStyle={styles.instructionsWithBg} back={() => {navigation.goBack()}}/>
	);
}
function ChooseIfFindJobHard({navigation}){
	return(
		<View style={styles.container}>
			<ImageBackground source = {require('./assets/Images/jobs-background.png')} style = {styles.container}>
				<FadeInText style={styles.instructionsWithBg} text={"You know you must find a job to survive at San Joaquin. Is it easy to find a job there?"}/>
				<View style={{flexDirection: 'row'}} >
					<GenButton text = "Yes" whenPressed={() => navigation.navigate('GameOverScreen', {message: 'It was very hard to find a job as a migrant in California.'})} butStyleText={buttonStyles.nextButtonText} butStyle={buttonStyles.leftButton}/>
					<GenButton text = "No" whenPressed={() => navigation.navigate('SanJoaquin')} butStyleText={buttonStyles.nextButtonText} butStyle={buttonStyles.rightButton}/>
				</View>
				<BackArrow event={() => navigation.goBack()}/>
				<StatusBar style="auto" />
			</ImageBackground>
		</View>
	);
}

function SanJoaquin({navigation}){
	return(
		<View style={styles.container}>
			<ImageBackground source = {require('./assets/Images/jobs-background.png')} style = {styles.container}>
				<FadeInText style={styles.instructionsWithBg} text={"Finding a job is very hard for migrants. What jobs are available for you?"}/>
				<MultipleChoice text1={'Teacher'} text2={'Lawyer'} text3={'Politician'} text4={'Farmer'} rightAns={4} wrong = {(() => navigation.navigate('GameOverScreen', {message: 'Farming was the only job available for new migrants.'}))} event = {(() => navigation.navigate('Farmer'))}/>
				<BackArrow event={() => navigation.goBack()}/>
				<StatusBar style="auto" />
			</ImageBackground>
		</View>
	);
}

function Farmer({navigation}){
	return(
		<NextPage text = "Being a farmer is one of the only jobs available for migrants. You find a job as a farmer." back={() => {navigation.goBack()}} event={() => {navigation.navigate('ChooseIfPayGood');}} imgbg = {require('./assets/Images/jobs-background.png')} textStyle={styles.instructionsWithBg}/>
	);
}

function ChooseIfPayGood({navigation}){
	return(
		<View style={styles.container}>
			<ImageBackground source = {require('./assets/Images/jobs-background.png')} style = {styles.container}>
				<FadeInText style={styles.instructionsWithBg} text={"Is the pay good in your job?"}/>
				<View style={{flexDirection: 'row'}} >
					<GenButton text = "Yes" whenPressed={() => navigation.navigate('GameOverScreen', {message: 'Farmers that migrated to California got very little pay.'})} butStyleText={buttonStyles.nextButtonText} butStyle={buttonStyles.leftButton}/>
					<GenButton text = "No" whenPressed={() => navigation.navigate('PayCorrect')} butStyleText={buttonStyles.nextButtonText} butStyle={buttonStyles.rightButton}/>
				</View>
				<BackArrow event={() => navigation.goBack()}/>
				<StatusBar style="auto" />
			</ImageBackground>
		</View>
	);
}

function PayCorrect({navigation}){
	return(
		<NextPage text = "You and all other farmers that migrated to San Joaquin got very little pay." back={() => {navigation.goBack()}} event={() => {navigation.navigate('IfResidentsNice')}} imgbg={require('./assets/Images/jobs-background.png')} textStyle={styles.instructionsWithBg}/>
	);
}

function IfResidentsNice({navigation}){
	return(
		<View style={styles.container}>
			<ImageBackground source = {require('./assets/Images/cali-farmer.png')} style = {styles.container}>
				<FadeInText style={styles.instructionsWithBg} text={"You see many non-migrant residents in San Joaquin. Are the residents of San Joaquin nice to you and the other migrants?"}/>
				<View style={{flexDirection: 'row'}} >
					<GenButton text = "Yes" whenPressed={() => navigation.navigate('GameOverScreen', {message: 'Most residents were very mean to migrants, and thought that there was not enough space for them in California. Migrants were labelled "Okies".'})} butStyleText={buttonStyles.nextButtonText} butStyle={buttonStyles.leftButton}/>
					<GenButton text = "No" whenPressed={() => navigation.navigate('ResidentsNotNice')} butStyleText={buttonStyles.nextButtonText} butStyle={buttonStyles.rightButton}/>
				</View>
				<BackArrow event={() => navigation.goBack()}/>
				<StatusBar style="auto" />
			</ImageBackground>
		</View>
	);
}
function ResidentsNotNice({navigation}){
	return(
		<NextPage text = "You and the other migrants were labelled 'Okies'. Most residents were very mean to migrants, and thought that there was not enough space for them in California." back={() => {navigation.goBack()}} event={() => {navigation.navigate('ChooseWhereLive')}} imgbg = {require('./assets/Images/cali-farmer.png')} textStyle = {styles.instructionsWithBg}/>
	);
}

function ChooseWhereLive({navigation}){
	return(
		<View style={styles.container}>
			<ImageBackground source = {require('./assets/Images/tent-on-ground.png')} style = {styles.container}>
				<FadeInText style={styles.instructionsWithBg} text={"Where do you and the other migrants live?"}/>
				<MultipleChoice text1={'Hotels'} text2={'Tents'} text3={'Apartments'} text4={'Houses'} rightAns={2} wrong = {(() => navigation.navigate('GameOverScreen', {message: 'Farmers mainly lived in tents and shantytowns.'}))} event = {(() => navigation.navigate('ChoseTents'))}/>
				<BackArrow event={() => navigation.goBack()}/>
				<StatusBar style="auto" />
			</ImageBackground>
		</View>
	);
}

function ChoseTents({navigation}){
	return(
		<NextPage text = "You and the ohter migrants live in tents and shantytowns." event={() => {navigation.navigate('LifeInCalifornia1')}} back={() => {navigation.goBack()}} imgbg={require('./assets/Images/tent-on-ground.png')} textStyle={styles.instructionsWithBg}/>
	);
}

function LifeInCalifornia1({navigation}){
	return(
		<NextPage text = "You live a meager life in California working as a farmer and living in tents. The residents are not nice to you and you have few allies." back={() => {navigation.goBack()}} event={() => {navigation.navigate('LifeInCalifornia2')}} textStyle={styles.instructionsWithBg} imgbg={require('./assets/Images/arrive-in-CA.png')}/>
	);
}

function LifeInCalifornia2({navigation}){
	return(
		<NextPage text = "You have survived the Dust Bowl and the Great Depression, but your life and the lives of all of the other Dust Bowl migrants are and will continue to be very hard." back={() => {navigation.goBack()}} event={() => {navigation.navigate('FinishedGame')}} textStyle={styles.instructionsWithBg} imgbg={require('./assets/Images/arrive-in-CA.png')}/>
	);
}

function FinishedGame({navigation}){
	return(
		<View style={styles.container}>
			<ImageBackground source = {require('./assets/Images/dust-storm-vertical.png')} style = {styles.container}>
				<FadeInText style={styles.smallerTitle} text={"Congratulations!"}/>
				<FadeInText style={styles.instructions} text={"You survived the Dust Bowl. \n\nThousands of people lost their lives in the dust bowl to 'dust pneumonia', including young children. \nAbout 250,000 farmers fled the plains to look for a better life elsewhere."}/>
				<GenButton text = "Play Again" whenPressed={() => navigation.navigate('Home')} butStyleText={buttonStyles.nextButtonText} butStyle={buttonStyles.nextButton}/>
				<BackArrow event={() => navigation.goBack()}/>
				<StatusBar style="auto" />
			</ImageBackground>
		</View>
	);
}

//initial stay path screen
function StayPath({navigation}){
	return (
		<View style={styles.container}>
			<ImageBackground source = {require('./assets/Images/dust-storm-vertical.png')} style = {styles.container}>
				<FadeInText style={styles.instructions} text={"You decide to stay and face the dust storms."}/>
				<BackArrow event={() => navigation.goBack()}/>
				<StatusBar style="auto" />
			</ImageBackground>
		</View>
	);
}

const Stack = createNativeStackNavigator();
//main function
function App() {
	return (
    <NavigationContainer>
      <Stack.Navigator screenOptions = {{headerShown: false, animationEnabled: false}}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
        />
		<Stack.Screen
		  name="Information1"
		  component={Information1}
		/>
		<Stack.Screen
		  name="Information2"
		  component={Information2}
		/>
		<Stack.Screen
			name="Instructions"
			component={Instructions}
		/>
		<Stack.Screen
			name="LeavePath"
			component={LeavePath}
		/>
		<Stack.Screen
			name="CorrectBelongings"
			component={CorrectBelongings}
		/>
		<Stack.Screen
			name="ChooseSellFarm"
			component={ChooseSellFarm}
		/>
		<Stack.Screen
			name="SellFarm"
			component={SellFarm}
		/>
		<Stack.Screen
			name="ChooseRoad"
			component={ChooseRoad}
		/>
		<Stack.Screen
			name="RouteSixtySix"
			component={RouteSixtySix}
		/>
		<Stack.Screen
			name="WhereSleep"
			component={WhereSleep}
		/>
		<Stack.Screen
			name="SleepCorrect"
			component={SleepCorrect}
		/>
		<Stack.Screen
			name="GasStation"
			component={GasStation}
		/>
		<Stack.Screen
			name="CorrectGas"
			component={CorrectGas}
		/>
		<Stack.Screen
			name="NumPeople"
			component={NumPeople}
		/>
		<Stack.Screen
			name="NumPeopleCorrect"
			component={NumPeopleCorrect}
		/>
		<Stack.Screen
			name="GetFood"
			component={GetFood}
		/>
		<Stack.Screen
			name="GetFoodCorrect"
			component={GetFoodCorrect}
		/>
		<Stack.Screen
			name="ContinueOnJourney"
			component={ContinueOnJourney}
		/>
		<Stack.Screen
			name="DeathValley"
			component={DeathValley}
		/>
		<Stack.Screen
			name="DeathValleyCorrect"
			component={DeathValleyCorrect}
		/>
		<Stack.Screen
			name="ReachCalifornia"
			component={ReachCalifornia}
		/>
		<Stack.Screen
			name="ChooseIfFindJobHard"
			component={ChooseIfFindJobHard}
		/>
		<Stack.Screen
			name="SanJoaquin"
			component={SanJoaquin}
		/>
		<Stack.Screen
			name="Farmer"
			component={Farmer}
		/>
		<Stack.Screen
			name="ChooseIfPayGood"
			component={ChooseIfPayGood}
		/>
		<Stack.Screen
			name="PayCorrect"
			component={PayCorrect}
		/>
		<Stack.Screen
			name="IfResidentsNice"
			component={IfResidentsNice}
		/>
		<Stack.Screen
			name="ResidentsNotNice"
			component={ResidentsNotNice}
		/>
		<Stack.Screen
			name="ChooseWhereLive"
			component={ChooseWhereLive}
		/>
		<Stack.Screen
			name="ChoseTents"
			component={ChoseTents}
		/>
		<Stack.Screen
			name="LifeInCalifornia1"
			component={LifeInCalifornia1}
		/>
		<Stack.Screen
			name="LifeInCalifornia2"
			component={LifeInCalifornia2}
		/>
		<Stack.Screen
			name="GameOverScreen"
			component={GameOverScreen}
		/>
		<Stack.Screen
			name="FinishedGame"
			component={FinishedGame}
		/>
		<Stack.Screen
			name="StayPath"
			component={StayPath}
		/>
		

      </Stack.Navigator>
    </NavigationContainer>
  );
	
	
}
//button and button text styles
const buttonStyles = StyleSheet.create({
	nextButton: {
	  paddingVertical: WINDOW_HEIGHT * 0.02,
	  paddingHorizontal: WINDOW_WIDTH * 0.08,
	  marginTop: WINDOW_HEIGHT * 0.05,
	  top: 0,
	  backgroundColor: '#000000',
	  //opacity: 0.5,
	  flexDirection: "column",
      justifyContent: "flex-end",
	  borderRadius: 50,
	  elevation: 30,
	  shadowColor: '#404040',
	  shadowOffset: { width: -3, height: WINDOW_HEIGHT/120 },
	  shadowOpacity: 1,
  },
  nextButtonText: {
	  color: '#fff',
	  fontSize: 20,
	  alignSelf: 'center',
  },
  startButtonText: {
	  fontSize: 30,
	  fontWeight: "500",
  },
  startButton: {
	  paddingVertical: WINDOW_HEIGHT * 0.02,
	  paddingHorizontal: WINDOW_WIDTH * 0.05,
	  borderRadius: 50,
	  marginTop: WINDOW_HEIGHT/10,
	  backgroundColor: '#3446cf',
	  flexDirection: "column",
      justifyContent: "flex-end",
	  elevation: 50,
	  shadowColor: '#117fed',
	  shadowOffset: { width: -2, height: WINDOW_HEIGHT/120 },
	  shadowOpacity: 1,
  },
  leftButton: {
	  padding: WINDOW_WIDTH/70,
	  borderRadius: 30,
	  marginTop: WINDOW_HEIGHT/10,
	  right: WINDOW_WIDTH/10,
	  top: 0,
	  backgroundColor: '#3446cf',
	  flexDirection: "column",
      justifyContent: "flex-end",
	  elevation: 30,
	  shadowColor: '#117fed',
	  shadowOffset: { width: -2, height: WINDOW_HEIGHT/160 },
	  shadowOpacity: 1,
	  
  },
  rightButton: {
	  padding: WINDOW_WIDTH/70,
	  borderRadius: 30,
	  left: WINDOW_WIDTH/10,
	  marginTop: WINDOW_HEIGHT/10,
	  //bottom: (WINDOW_HEIGHT*1.9)/20,
	  backgroundColor: '#3446cf',
	  flexDirection: "column",
      justifyContent: "flex-end",
	  elevation: 30,
	  shadowColor: '#117fed',
	  shadowOffset: { width: -2, height: WINDOW_HEIGHT/160 },
	  shadowOpacity: 1,
	  
	  
  },
  multipleSelectButton: {
	  padding: WINDOW_HEIGHT/70,
	  borderRadius: 50,
	  marginTop: WINDOW_HEIGHT/25,
	  backgroundColor: '#fff',
	  //opacity: 0.5,
	  borderWidth: 2,
	  elevation: 10,
	  shadowColor: '#656565',
	  shadowOffset: { width: -3, height: WINDOW_HEIGHT/80 },
	  shadowOpacity: 1,
  },
  multipleSelectText: {
	  fontSize: WINDOW_WIDTH/50,
	  fontWeight: "200",
	  color: '#000',
	  alignSelf: 'center',
  },
  submitButton: {
	  padding: WINDOW_HEIGHT/40,
	  marginTop: WINDOW_HEIGHT/20,
	  backgroundColor: '#f7cf1b',
	  //opacity: 0.7,
	  borderRadius: 50,
	  elevation: 30,
	  shadowColor: '#949400',
	  shadowOffset: { width: -2, height: WINDOW_HEIGHT/80 },
	  shadowOpacity: 1,
  },
  backButton: {
	padding: WINDOW_WIDTH/50,
	backgroundColor: '#4b54fa',
	position: 'absolute',
	bottom: 0,
	left: 0,
	borderTopRightRadius:20,
	elevation: 30,
	shadowColor: '#020654',
	shadowRadius: 15,
	shadowOffset: { width: 0, height: 0 },
	shadowOpacity: 1,
  }, 
  backButtonText: {
	  fontSize: WINDOW_WIDTH/60,
	  color: '#000000',
	  alignSelf: 'center',
	  fontWeight: "300",
  }
});
//general styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
	width: WINDOW_WIDTH,
	height:WINDOW_HEIGHT,
  },
  title: {
	color: 'black',
	fontWeight: 'bold',
	fontSize: WINDOW_HEIGHT/7,
	textAlign: "center",
  },
  smallerTitle: {
	color: 'black',
	fontWeight: 'bold',
	fontSize: WINDOW_HEIGHT/10,
	textAlign: "center",
	},
  instructions: {
	fontWeight: "300" ,
	fontSize: 25,
	textAlign: "center",
  },
  instructionsWithBg: {
	fontWeight: "300" ,
	fontSize: 25,
	textAlign: "center",
	backgroundColor: 'rgba(255, 255, 255,.8)',
	borderRadius:30,
	padding: 10,
	overflow: 'hidden',
	//padding: WINDOW_HEIGHT/150,
  },
  map: {
	width: (WINDOW_WIDTH*3)/4,
  height: (WINDOW_HEIGHT*2)/3,
	resizeMode: 'contain',
  
	//aspectRatio: 0.85,
  }
  
});

export default App;
