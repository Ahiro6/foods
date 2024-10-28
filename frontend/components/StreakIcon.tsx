//import { streakCounter } from "@nikmargit/streak-counter";

import { Layout, Text } from "@ui-kitten/components";

import { StyleSheet } from "react-native";

import { default as theme } from '../app/theme.json'; // <-- Import app theme
import ReactCurvedText from 'react-curved-text'
import { useState } from "react";

//import "./styles.css";

const StreakIcon = ({ count }: { count: any }) => {

    const [color, setColor] = useState(theme['color-success-500'])

    const toggleColor = () => {
        if (color == theme['color-success-500']) {
            setColor(theme['color-success-400'])
            return
        }
        setColor(theme['color-success-500'])
    }

    return (
        <Layout style={{ ...styles.container, backgroundColor: color }} onPointerEnter={toggleColor} onPointerLeave={toggleColor}>
            <Layout style={styles.curvedText}>
                <Text category="h6">
                    STREAK
                    {/* <ReactCurvedText
                        width={100}
                        height={100}
                        cx={40}
                        cy={45}
                        rx={33}
                        ry={33}
                        startOffset={20}
                        text="STREAK"
                        reversed={true}
                        textPathProps={{ "fill": "#c1f82a" }}
                    /> */}
                </Text>
            </Layout>
            <Layout>
                <Text category="h6" style={styles.icon}>
                    {count > 0 ? '🔥' : '💩'}
                </Text>
            </Layout>
            <Text style={styles.text} category="h6">
                {count}
            </Text>
        </Layout>
    );
}

export default StreakIcon

const styles = StyleSheet.create({
    container: {
        padding: 12,
        backgroundColor: theme['color-success-500'],
        borderRadius: 55,
        height: 110,
        width: 110,
        borderColor: theme['color-success-600'],
        borderWidth: 5
    },
    icon: {
        textAlign: 'center',
        fontSize: 35,
        backgroundColor: theme['color-success-500'],
        margin: 0,
    },
    text: {
        textAlign: 'center',

    },
    curvedText: {
        zIndex: 5,
        backgroundColor: 'none',
        fontWeight: 'bold',
        fontSize: 10,
        textDecorationColor: theme['color-danger-400']
    }
})