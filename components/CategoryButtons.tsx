import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native'
import React, { useRef, useState } from 'react'
import Colors from '@/constants/Colors'
import destinationCategories from '@/data/categories'
import { MaterialCommunityIcons } from '@expo/vector-icons'

type Props = {
    onCategoryChanged: (category: string) => void;
}

const CategoryButtons = ({ onCategoryChanged }: Props) => {
    const scrollRef = useRef<ScrollView>(null);
    const itemRef = useRef<TouchableOpacity[] | null[]>([]);
    const [activeIndex, setActiveIndex] = useState(0);

    const handleSelectCategory = (index: number) => {
        const selected = itemRef.current[index];
        setActiveIndex(index);
        // console.log(index);
        selected?.measure((x) => {
            scrollRef.current?.scrollTo({ x:x, y: 0, animated: true });
        });
        onCategoryChanged(destinationCategories[index].title);
    };

    return (
        <View>
            <Text style={styles.title}>Categories</Text>
            <ScrollView
                ref={scrollRef}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    gap: 15,
                    paddingVertical: 10,
                    marginBottom: 10,
                }}>
                {destinationCategories.map((item, index) => (
                    <TouchableOpacity
                    key={index}
                        ref={(el) => itemRef.current[index] = el}
                        onPress={() => handleSelectCategory(index)}
                        style={activeIndex == index
                            ? styles.categoryBtnActive :
                            styles.categoryBtn
                        }>
                        <MaterialCommunityIcons name={item.iconName as any} size={20}
                            color={activeIndex == index ? Colors.primaryColor : Colors.black} />
                        <Text style={activeIndex == index ? styles.categoryBtnTxtActive : styles.categoryBtnTxt}>{item.title}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    )
}

export default CategoryButtons

const styles = StyleSheet.create({
    title: {
        fontSize: 22,
        fontWeight: "600",
        color: Colors.black,

    },
    categoryBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.white,
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 10,
        shadowColor: "#333333",
        shadowOffset: { width: 1, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    categoryBtnTxt: {
        fontSize: 16,
        marginLeft: 5,
        color: "orangered",
    },
    categoryBtnActive: {
        backgroundColor: "black",
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 10,
        shadowColor: "#333333",
        shadowOffset: { width: 1, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    categoryBtnTxtActive: {
        marginLeft: 5,
        color: Colors.white,
    }
})